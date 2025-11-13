// 장바구니 Store - 함수형 Observer 패턴
const createCartStore = () => {
  // 클로저로 관리되는 상태
  let state = {
    items: [], // { productId, title, image, lprice, quantity, selected }
  };

  let subscribers = [];

  // localStorage에서 장바구니 데이터 로드
  const loadFromStorage = () => {
    try {
      const saved = localStorage.getItem("shopping_cart");
      if (saved) {
        state.items = JSON.parse(saved);
        notify();
      }
    } catch (error) {
      console.error("장바구니 데이터 로드 실패:", error);
    }
  };

  // localStorage에 장바구니 데이터 저장
  const saveToStorage = () => {
    try {
      localStorage.setItem("shopping_cart", JSON.stringify(state.items));
    } catch (error) {
      console.error("장바구니 데이터 저장 실패:", error);
    }
  };

  // 상태 변경 알림
  const notify = () => {
    subscribers.forEach((callback) => callback(state));
  };

  // 구독자 등록
  const subscribe = (callback) => {
    subscribers.push(callback);
    // 즉시 현재 상태를 전달
    callback(state);

    // 구독 해제 함수 반환
    return () => {
      subscribers = subscribers.filter((sub) => sub !== callback);
    };
  };

  // 상품 추가
  const addItem = (product, quantity = 1) => {
    // productId를 문자열로 통일
    const productId = String(product.productId);
    const existingItemIndex = state.items.findIndex((item) => String(item.productId) === productId);

    if (existingItemIndex !== -1) {
      // 이미 있는 상품이면 수량만 증가 (불변성 유지)
      state.items = state.items.map((item, index) =>
        index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item,
      );
    } else {
      // 새 상품 추가
      state.items = [
        ...state.items,
        {
          productId: productId,
          title: product.title,
          image: product.image,
          lprice: product.lprice,
          quantity: quantity,
          selected: false,
        },
      ];
    }

    saveToStorage();
    notify();
  };

  // 상품 수량 변경
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    state.items = state.items.map((item) => (item.productId === productId ? { ...item, quantity } : item));

    saveToStorage();
    notify();
  };

  // 상품 수량 증가
  const increaseQuantity = (productId, amount) => {
    amount = amount !== undefined ? amount : 1;
    const target = state.items.find((item) => item.productId === productId);
    if (!target) {
      return;
    }

    updateQuantity(productId, target.quantity + amount);
  };

  // 상품 수량 감소 (최소 1 유지)
  const decreaseQuantity = (productId, amount) => {
    amount = amount !== undefined ? amount : 1;
    const target = state.items.find((item) => item.productId === productId);
    if (!target) {
      return;
    }

    const nextQuantity = target.quantity - amount;
    updateQuantity(productId, nextQuantity < 1 ? 1 : nextQuantity);
  };

  // 상품 삭제
  const removeItem = (productId) => {
    state.items = state.items.filter((item) => item.productId !== productId);
    saveToStorage();
    notify();
  };

  // 선택된 상품 삭제
  const removeSelectedItems = () => {
    state.items = state.items.filter((item) => !item.selected);
    saveToStorage();
    notify();
  };

  // 전체 비우기
  const clear = () => {
    state.items = [];
    saveToStorage();
    notify();
  };

  // 상품 선택/해제
  const toggleSelect = (productId) => {
    state.items = state.items.map((item) =>
      item.productId === productId ? { ...item, selected: !item.selected } : item,
    );
    saveToStorage();
    notify();
  };

  // 전체 선택/해제
  const toggleSelectAll = () => {
    const allSelected = state.items.every((item) => item.selected);
    state.items = state.items.map((item) => ({
      ...item,
      selected: !allSelected,
    }));
    saveToStorage();
    notify();
  };

  // 장바구니 아이템 개수 (고유 상품 종류의 개수)
  const getItemCount = () => {
    return state.items.length;
  };

  // 선택된 아이템 개수
  const getSelectedCount = () => {
    return state.items.filter((item) => item.selected).length;
  };

  // 총 금액 계산
  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + item.lprice * item.quantity, 0);
  };

  // 선택된 아이템 총 금액
  const getSelectedTotalPrice = () => {
    return state.items.filter((item) => item.selected).reduce((total, item) => total + item.lprice * item.quantity, 0);
  };

  // 현재 상태 반환
  const getState = () => {
    return { ...state };
  };

  // 초기화: localStorage에서 데이터 로드
  loadFromStorage();

  // Public API 반환
  return {
    subscribe,
    addItem,
    updateQuantity,
    removeItem,
    removeSelectedItems,
    clear,
    toggleSelect,
    toggleSelectAll,
    increaseQuantity,
    decreaseQuantity,
    getItemCount,
    getSelectedCount,
    getTotalPrice,
    getSelectedTotalPrice,
    getState,
  };
};

// 싱글톤 인스턴스 생성 및 export
export const cartStore = createCartStore();

import { CartModal } from "./CartModal";
import { cartStore } from "../store/cartStore";
import { Toast } from "./Toast";
/**
 * 장바구니 모달 컨트롤러
 * 모달 열기/닫기 및 이벤트 리스너 관리
 */
const createCartModalHandler = () => {
  /**
   * 모달 열기
   */
  const open = () => {
    const $modalContainer = document.querySelector("#cart-modal-container");
    const cartList = getCartList();
    if ($modalContainer) {
      // 모달이 이미 있으면 최신 상태로 업데이트
      const $modalContent = $modalContainer.querySelector("#cart-modal-dialog");
      if ($modalContent) {
        $modalContent.outerHTML = CartModal(cartList);
      }
      $modalContainer.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      modalEventListeners();
    } else {
      // 모달이 없으면 생성
      const modalHTML = `
      <div id="cart-modal-container" class="fixed inset-0 z-50 overflow-y-auto cart-modal">
        <div id="cart-modal-overlay" class="fixed inset-0 bg-black bg-opacity-50 transition-opacity cart-modal-overlay"></div>
        ${CartModal(cartList)}
      </div>
      `;

      const $root = document.querySelector("#root");
      if ($root) {
        $root.insertAdjacentHTML("beforeend", modalHTML);
      } else {
        document.body.insertAdjacentHTML("beforeend", modalHTML);
      }
      document.body.style.overflow = "hidden";
      modalEventListeners();
    }
  };

  /**
   * 모달 닫기
   */
  const close = () => {
    const $modalContainer = document.querySelector("#cart-modal-container");
    if ($modalContainer) {
      $modalContainer.classList.add("hidden");
      document.body.style.overflow = "";
    }
  };

  /**
   * 모달 이벤트 리스너 초기화
   */
  const init = () => {
    // 클릭 이벤트 리스너
    document.body.addEventListener("click", (e) => {
      const $target = e.target;
      if ($target.closest("#cart-icon-btn")) {
        open();
        return;
      }

      if ($target.closest("#cart-modal-close-btn")) {
        close();
        return;
      }

      // 장바구니 모달 오버레이 클릭 (모달 내부 제외)
      if ($target.id === "cart-modal-overlay") {
        close();
        return;
      }
    });

    // ESC 키 이벤트 리스너
    document.body.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const $modalContainer = document.querySelector("#cart-modal-container");
        if ($modalContainer && !$modalContainer.classList.contains("hidden")) {
          close();
        }
      }
    });
  };

  const getCartList = () => {
    const cartList = cartStore.getState().items;
    console.log(cartList);
    return cartList;
  };

  const rerenderModal = () => {
    const cartList = getCartList();
    const $modalContent = document.querySelector("#cart-modal-dialog");
    if ($modalContent) {
      $modalContent.outerHTML = CartModal(cartList);
      modalEventListeners();
    }
  };

  // 선택된 항목 삭제 버튼 표시/숨김 관리
  const updateRemoveSelectedButton = () => {
    const $selectAllDeleteBtn = document.querySelector("#cart-modal-clear-cart-btn");
    const $existingRemoveBtn = document.querySelector("#cart-modal-remove-selected-btn");
    const selectedCount = cartStore.getSelectedCount();

    if (selectedCount > 0) {
      // 선택된 항목이 있고 버튼이 없으면 추가
      if ($selectAllDeleteBtn && !$existingRemoveBtn) {
        $selectAllDeleteBtn.parentElement.insertAdjacentHTML(
          "beforebegin",
          `
          <button id="cart-modal-remove-selected-btn" class="w-full bg-red-600 text-white py-2 px-4 rounded-md 
                         hover:bg-red-700 transition-colors text-sm mb-2">
            선택한 상품 삭제 (${selectedCount}개)
          </button>
        `,
        );

        // 추가한 버튼에 이벤트 리스너 연결
        const $removeSelectedBtn = document.querySelector("#cart-modal-remove-selected-btn");
        if ($removeSelectedBtn) {
          $removeSelectedBtn.addEventListener("click", () => {
            cartStore.removeSelectedItems();
            Toast({ result: "delete" });
            rerenderModal();
          });
        }
      } else if ($existingRemoveBtn) {
        // 버튼이 이미 있으면 개수만 업데이트
        $existingRemoveBtn.textContent = `선택한 상품 삭제 (${selectedCount}개)`;
      }
    } else {
      // 선택된 항목이 없으면 버튼 제거
      if ($existingRemoveBtn) {
        $existingRemoveBtn.remove();
      }
    }
  };

  /**
   * 모달 내부 이벤트 리스너 연결
   */
  const modalEventListeners = () => {
    // 모달 내용 클릭 시 이벤트 전파 차단 (오버레이 클릭으로 인식되지 않도록)
    const $modalDialog = document.querySelector("#cart-modal-dialog");
    if ($modalDialog) {
      $modalDialog.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }

    // X 버튼 클릭 이벤트
    const $closeBtn = document.querySelector("#cart-modal-close-btn");
    if ($closeBtn) {
      $closeBtn.addEventListener("click", () => {
        close();
      });
    }

    // 전체선택 체크박스
    const $selectAllCheckbox = document.querySelector("#cart-modal-select-all-checkbox");
    if ($selectAllCheckbox) {
      $selectAllCheckbox.addEventListener("change", () => {
        cartStore.toggleSelectAll();
        // 상태 변경 후 모달 업데이트
        rerenderModal();
        // 버튼 표시/숨김 업데이트
        updateRemoveSelectedButton();
      });
    }

    // 개별 아이템 체크박스
    const $itemCheckboxes = document.querySelectorAll(".cart-item-checkbox");
    $itemCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const productId = checkbox.dataset.productId;
        cartStore.toggleSelect(productId);
        // 상태 변경 후 모달 업데이트
        rerenderModal();
        // 버튼 표시/숨김 업데이트
        updateRemoveSelectedButton();
      });
    });

    // 수량체크 버튼
    const $increaseButtons = document.querySelectorAll(".quantity-increase-btn");
    const $decreaseButtons = document.querySelectorAll(".quantity-decrease-btn");

    $increaseButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.currentTarget.dataset.productId;
        cartStore.increaseQuantity(productId);
        rerenderModal();
      });
    });

    $decreaseButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.currentTarget.dataset.productId;
        cartStore.decreaseQuantity(productId);
        rerenderModal();
      });
    });

    // 개별 삭제버튼
    const $removeButtons = document.querySelectorAll(".cart-item-remove-btn");
    $removeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.currentTarget.dataset.productId;
        cartStore.removeItem(productId);
        rerenderModal();
      });
    });

    // 전체 삭제버튼
    const $clearCartBtn = document.querySelector("#cart-modal-clear-cart-btn");
    if ($clearCartBtn) {
      $clearCartBtn.addEventListener("click", () => {
        cartStore.clear();
        Toast({ result: "reset" });
        rerenderModal();
      });
    }
  };

  // Public API 반환
  return {
    open,
    close,
    init,
  };
};

// 싱글톤 인스턴스 생성 및 export
export const CartModalFn = createCartModalHandler();

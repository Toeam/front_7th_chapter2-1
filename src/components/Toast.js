// Toast HTML 템플릿 생성 함수
const getToastHTML = (result) => {
  if (result === "success") {
    return `
      <div class="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
          <div class="flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <p class="text-sm font-medium">장바구니에 추가되었습니다</p>
          <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
    `;
  } else if (result === "delete") {
    return `
      <div class="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
          <div class="flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
           </svg>
          </div>
          <p class="text-sm font-medium">선택된 상품들이 삭제되었습니다</p>
          <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
    `;
  } else if (result === "reset") {
    return `
      <div class="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
          <div class="flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
           </svg>
          </div>
          <p class="text-sm font-medium">장바구니가 비워졌습니다.</p>
          <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
    `;
  } else if (result === "error") {
    return `
      <div class="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
          <div class="flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
          <p class="text-sm font-medium">오류가 발생했습니다.</p>
          <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
    `;
  }
  return "";
};

// Toast 타이머 관리
let toastTimer = null;

// Toast를 화면에 표시하는 함수
export const Toast = ({ result }) => {
  if (!result) return;

  // 모달이 열려있는지 확인
  const $modalContainer = document.querySelector("#cart-modal-container");
  const isModalOpen = $modalContainer && !$modalContainer.classList.contains("hidden");

  // Toast 컨테이너가 없으면 생성
  let toastContainer = document.querySelector("#toast");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast";
    toastContainer.className =
      "fixed bottom-4 left-0 right-0 z-50 flex flex-col gap-2 items-center justify-center mx-auto";
    toastContainer.style.width = "fit-content";
  }

  // 모달이 열려있으면 모달 컨테이너 내부에, 닫혀있으면 body에 추가
  if (isModalOpen && $modalContainer) {
    // 기존 컨테이너가 다른 곳에 있으면 제거
    if (toastContainer.parentElement && toastContainer.parentElement !== $modalContainer) {
      toastContainer.remove();
    }
    // 모달 컨테이너에 추가 (없을 때만)
    if (!toastContainer.parentElement) {
      $modalContainer.appendChild(toastContainer);
    }
  } else {
    // 기존 컨테이너가 다른 곳에 있으면 제거
    if (toastContainer.parentElement && toastContainer.parentElement !== document.body) {
      toastContainer.remove();
    }
    // body에 추가 (없을 때만)
    if (!toastContainer.parentElement) {
      document.body.appendChild(toastContainer);
    }
  }

  // 기존 토스트와 타이머 제거
  toastContainer.innerHTML = "";
  if (toastTimer) {
    clearTimeout(toastTimer);
    toastTimer = null;
  }

  // Toast 요소 생성
  const toastElement = document.createElement("div");
  toastElement.innerHTML = getToastHTML(result);
  const toast = toastElement.firstElementChild;

  // 닫기 버튼 이벤트
  const closeBtn = toast.querySelector("#toast-close-btn");
  const closeToast = () => {
    toast.remove();
    if (toastTimer) {
      clearTimeout(toastTimer);
      toastTimer = null;
    }
  };

  if (closeBtn) {
    closeBtn.addEventListener("click", closeToast);
  }

  // Toast를 컨테이너에 추가
  toastContainer.appendChild(toast);

  // 3초 후 자동으로 닫기
  toastTimer = setTimeout(() => {
    closeToast();
    toastTimer = null;
  }, 3000);
};

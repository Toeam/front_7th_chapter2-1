import { getProducts } from "../api/productApi";
import { getCategories } from "../api/productApi";

/**
 * 무한 스크롤 상태 관리
 */
class InfiniteScrollManager {
  constructor() {
    this.currentPage = 1;
    this.isLoading = false;
    this.hasMore = true;
    this.observer = null;
    this.currentParams = {};
    this.allProducts = [];
    this.categories = null;
    this.selectedCategory1 = null;
    this.selectedCategory2 = null;
  }

  /**
   * 무한 스크롤 초기화
   */
  init() {
    this.reset();
    this.setupObserver();
  }

  /**
   * 상태 초기화
   */
  reset() {
    this.currentPage = 1;
    this.isLoading = false;
    this.hasMore = true;
    this.allProducts = [];
    this.currentParams = {};
    this.selectedCategory1 = null;
    this.selectedCategory2 = null;
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  /**
   * 현재 URL 파라미터 읽기
   */
  readCurrentParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category1 = urlParams.get("category1");
    const category2 = urlParams.get("category2");
    const searchFromUrl = urlParams.get("search");
    const searchInput = document.querySelector("#search-input");
    const searchFromInput = searchInput ? searchInput.value : "";
    // URL의 검색어를 우선 사용하고, 없으면 검색창의 값을 사용
    const search = searchFromUrl || searchFromInput;
    const limitSelect = document.querySelector("#limit-select");
    const limit = limitSelect ? parseInt(limitSelect.value) : 20;
    const sortSelect = document.querySelector("#sort-select");
    const sort = sortSelect ? sortSelect.value : "price_asc";

    return {
      category1: category1 || "",
      category2: category2 || "",
      search: search || "",
      limit,
      sort,
    };
  }

  /**
   * Intersection Observer 설정
   */
  setupObserver() {
    // 홈 페이지가 아닌 경우 무한 스크롤 비활성화
    const basePath = import.meta.env.BASE_URL;
    const pathName = window.location.pathname;
    const relativePath = pathName.replace(basePath, "/").replace(/\/$/, "") || "/";

    if (relativePath !== "/") {
      return;
    }

    // 기존 observer가 있으면 제거
    if (this.observer) {
      this.observer.disconnect();
    }

    // 감지할 요소 생성 (하단에 배치될 요소)
    const $productsGrid = document.querySelector("#products-grid");
    if (!$productsGrid) {
      return;
    }

    // 로딩 인디케이터 요소 생성
    let $loadingIndicator = document.querySelector("#infinite-scroll-loading");
    if (!$loadingIndicator) {
      $loadingIndicator = document.createElement("div");
      $loadingIndicator.id = "infinite-scroll-loading";
      $loadingIndicator.className = "infinite-scroll-trigger";
      $loadingIndicator.style.height = "100px";
      $productsGrid.parentElement.appendChild($loadingIndicator);
      // 초기 빈 상태로 설정
      $loadingIndicator.innerHTML = "";
    }

    // Intersection Observer 생성
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.isLoading && this.hasMore) {
            // 로딩 인디케이터를 먼저 표시한 후 로드 시작
            this.updateLoadingIndicator(true);
            // 다음 이벤트 루프에서 로드 시작 (DOM 업데이트 보장)
            setTimeout(() => {
              this.loadNextPage();
            }, 0);
          }
        });
      },
      {
        root: null,
        rootMargin: "200px", // 하단 200px 전에 미리 로드
        threshold: 0.1,
      },
    );

    this.observer.observe($loadingIndicator);
  }

  /**
   * 다음 페이지 데이터 로드
   */
  async loadNextPage() {
    if (this.isLoading || !this.hasMore) {
      return;
    }

    this.isLoading = true;
    // 로딩 인디케이터 표시 (이미 표시되어 있어도 안전)
    this.updateLoadingIndicator(true);

    try {
      // 현재 파라미터 읽기
      const params = this.readCurrentParams();

      // 파라미터가 변경되었으면 초기화
      const paramsKey = JSON.stringify(params);
      const currentParamsKey = JSON.stringify(this.currentParams);
      if (paramsKey !== currentParamsKey) {
        this.reset();
        this.allProducts = [];
        this.currentParams = params;
        this.selectedCategory1 = params.category1;
        this.selectedCategory2 = params.category2;
      }

      // 다음 페이지 요청
      const nextPage = this.currentPage + 1;
      const response = await getProducts({
        ...this.currentParams,
        page: nextPage,
      });

      // 카테고리 정보는 첫 페이지에서만 가져오기
      if (!this.categories) {
        this.categories = await getCategories();
      }

      // 상품 목록에 추가
      if (response.products && response.products.length > 0) {
        this.allProducts = [...this.allProducts, ...response.products];
        this.currentPage = nextPage;

        // 더 불러올 데이터가 있는지 확인
        const totalPages = Math.ceil(response.pagination.total / response.pagination.limit);
        this.hasMore = nextPage < totalPages;

        // UI 업데이트
        this.updateProductList(response.pagination);
      } else {
        this.hasMore = false;
      }
    } catch (error) {
      console.error("무한 스크롤 로드 실패:", error);
      this.hasMore = false;
    } finally {
      this.isLoading = false;
      this.updateLoadingIndicator(false);
    }
  }

  /**
   * 로딩 인디케이터 업데이트
   */
  updateLoadingIndicator(show) {
    let $loadingIndicator = document.querySelector("#infinite-scroll-loading");
    if (!$loadingIndicator) {
      return;
    }

    if (show) {
      $loadingIndicator.innerHTML = `
        <div class="text-center py-4">
          <div class="inline-flex items-center">
            <svg class="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-sm text-gray-600">상품을 불러오는 중...</span>
          </div>
        </div>
      `;
    } else if (!this.hasMore) {
      $loadingIndicator.innerHTML = `
        <div class="text-center py-4">
          <span class="text-sm text-gray-500">모든 상품을 불러왔습니다.</span>
        </div>
      `;
    } else {
      $loadingIndicator.innerHTML = "";
    }
  }

  /**
   * 상품 목록 UI 업데이트
   */
  updateProductList() {
    const $productsGrid = document.querySelector("#products-grid");
    if (!$productsGrid) {
      return;
    }

    // 현재 그리드에 있는 상품 개수 확인
    const currentProductCount = $productsGrid.children.length;

    // 새로 추가할 상품들만 추출
    const newProducts = this.allProducts.slice(currentProductCount);

    // 새 상품 HTML 생성
    const newProductsHTML = newProducts
      .map((product) => {
        return `
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"
               data-product-id="${product.productId}">
            <!-- 상품 이미지 -->
            <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
              <img src="${product.image}"
                   alt="${product.title}"
                   class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                   loading="lazy">
            </div>
            <!-- 상품 정보 -->
            <div class="p-3">
              <div class="cursor-pointer product-info mb-3">
                <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                  ${product.title}
                </h3>
                <p class="text-xs text-gray-500 mb-2"></p>
                <p class="text-lg font-bold text-gray-900">
                  ${Number(product.lprice).toLocaleString()}원
                </p>
              </div>
              <!-- 장바구니 버튼 -->
              <button class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
                     hover:bg-blue-700 transition-colors add-to-cart-btn" data-product-id="${product.productId}">
                장바구니 담기
              </button>
            </div>
          </div>
        `;
      })
      .join("");

    // 새 상품들을 기존 그리드에 추가
    if (newProductsHTML) {
      $productsGrid.insertAdjacentHTML("beforeend", newProductsHTML);
    }
  }

  /**
   * 첫 페이지 데이터 설정 (홈페이지 초기 로드 시)
   */
  setInitialData(products, pagination, categories, selectedCategory1, selectedCategory2) {
    this.allProducts = products || [];
    this.currentPage = 1;
    this.categories = categories;
    this.selectedCategory1 = selectedCategory1;
    this.selectedCategory2 = selectedCategory2;
    this.currentParams = this.readCurrentParams();

    // 더 불러올 데이터가 있는지 확인
    const totalPages = Math.ceil(pagination.total / pagination.limit);
    this.hasMore = this.currentPage < totalPages;

    // Observer 재설정
    setTimeout(() => {
      this.setupObserver();
    }, 100);
  }

  /**
   * 무한 스크롤 정리
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    const $loadingIndicator = document.querySelector("#infinite-scroll-loading");
    if ($loadingIndicator) {
      $loadingIndicator.remove();
    }
    this.reset();
  }
}

export const infiniteScrollManager = new InfiniteScrollManager();

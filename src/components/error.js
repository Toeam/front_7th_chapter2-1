import { PageLayout } from "../pages/PageLayout";

export const Error = () => {
  return PageLayout({
    children: `
      <div class="flex flex-col min-h-[calc(100vh-300px)]">
      <!-- 검색 및 필터 -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
            <!-- 검색창 -->
            <div class="mb-4">
              <div class="relative">
                <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." value="" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <!-- 필터 옵션 -->
            <div class="space-y-3">
              <!-- 카테고리 필터 -->
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600">카테고리:</label>
                  <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
                </div>
                <!-- 1depth 카테고리 -->
                <div class="flex flex-wrap gap-2">
                  <button data-category1="생활/건강" class="category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
                     bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                    생활/건강
                  </button>
                  <button data-category1="디지털/가전" class="category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
                     bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                    디지털/가전
                  </button>
                </div>
                <!-- 2depth 카테고리 -->
              </div>
              <!-- 기존 필터들 -->
              <div class="flex gap-2 items-center justify-between">
                <!-- 페이지당 상품 수 -->
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600">개수:</label>
                  <select id="limit-select"
                          class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <option value="10">
                      10개
                    </option>
                    <option value="20" selected="">
                      20개
                    </option>
                    <option value="50">
                      50개
                    </option>
                    <option value="100">
                      100개
                    </option>
                  </select>
                </div>
                <!-- 정렬 -->
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600">정렬:</label>
                  <select id="sort-select" class="text-sm border border-gray-300 rounded px-2 py-1
                               focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <option value="price_asc" selected="">가격 낮은순</option>
                    <option value="price_desc">가격 높은순</option>
                    <option value="name_asc">이름순</option>
                    <option value="name_desc">이름 역순</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
      <div class="flex-1 flex items-center justify-center min-h-0">
            <div>
              <!-- 상품 개수 정보 -->
              <div class="mb-4 text-sm text-gray-600">
              </div>
              <!-- 상품 그리드 -->
              <div id="products-grid">
                <div class="flex flex-col justify-center items-center">
                  <div class="flex items-center justify-center gap-2 mb-4">
                    <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="text-red-500">상품을 불러오는데 실패했습니다.</span>
                  </div>
                  <button id="retry-btn" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">다시 시도</button>
                </div>
              </div>
            </div>
          </div>
      </div>
      `,
  });
};

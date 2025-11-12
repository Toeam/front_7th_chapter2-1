const LoadingCategory = `
                  <div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>
`;

const Category1 = (categories) => {
  console.log(categories);
  const category1 = Object.keys(categories);

  return `
    ${category1
      .map(
        (items) => `
      <button data-category1="${items}" data-category2="생활용품" class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
        ${items}
      </button>
    `,
      )
      .join("")}
`;

  /*
<button data-category1="생활/건강" data-category2="생활용품" class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                    생활용품
                  </button>
                  <button data-category1="생활/건강" data-category2="주방용품" class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                    주방용품
                  </button>
                  <button data-category1="생활/건강" data-category2="문구/사무용품" class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                    문구/사무용품
                  </button>
  */
};

const SelectLimit = (pagination) => {
  const currentLimit = pagination?.limit || 20;
  const options = [10, 20, 50, 100];

  return `
  <select id="limit-select"
                          class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    ${options
                      .map(
                        (limit) => `
                    <option value="${limit}" ${limit == currentLimit ? "selected" : ""}>
                      ${limit}개
                    </option>
                    `,
                      )
                      .join("")}
                  </select>
`;
};

export const SearchForm = ({ filters, pagination, loading, categories }) => {
  console.log(filters);
  return `
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
            <!-- 검색창 -->
            <div class="mb-4">
              <div class="relative">
                <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." value="" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <div class="absolutg e inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svclass="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  ${loading ? LoadingCategory : Category1(categories)}
                </div>


                <!-- 2depth 카테고리 -->
              </div>
              <!-- 기존 필터들 -->
              <div class="flex gap-2 items-center justify-between">
                <!-- 페이지당 상품 수 -->
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600">개수:</label>
                  ${SelectLimit(pagination)}
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
  `;
};

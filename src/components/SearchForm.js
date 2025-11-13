const LoadingCategory = `
                  <div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>
`;

const Category1 = (categories, selectedCategory1) => {
  console.log(categories);
  const category1 = Object.keys(categories);

  if (selectedCategory1) {
    return "";
  }
  return `
    ${category1
      .map(
        (items) => `
      <button data-category1="${items}" class="category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
                     bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
        ${items}
      </button>
    `,
      )
      .join("")}
`;
};

// 카테고리1로 카테고리 2 목록 추출
const CategorySub = (categories, category1) => {
  if (categories && categories[category1]) {
    console.log(Object.keys(categories[category1]));
    return Object.keys(categories[category1]);
  }
  return [];
};

const Category2 = (categories, selectedCategory1, selectedCategory2) => {
  const category2List = CategorySub(categories, selectedCategory1);

  if (!selectedCategory1 || category2List.length === 0) {
    return "";
  }

  return `
      ${category2List
        .map((category2) => {
          const isSelected = selectedCategory2 === category2;
          const selectedClass = "bg-blue-100 border-blue-300 text-blue-800";
          const defaultClass = "bg-white border-gray-300 text-gray-700 hover:bg-gray-50";
          return `
        <button data-category1="${selectedCategory1}" data-category2="${category2}" class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors ${isSelected ? selectedClass : defaultClass}">
          ${category2}
        </button>
      `;
        })
        .join("")}
  `;
};

const CategoryCrumbs = (selectedCategory1, selectedCategory2) => {
  const categoryList = [];

  if (selectedCategory1) {
    categoryList.push({ name: selectedCategory1, type: "category1" });
  }

  if (selectedCategory2) {
    categoryList.push({ name: selectedCategory2, type: "category2", category1: selectedCategory1 });
  }

  if (categoryList.length === 0) {
    return "";
  }

  return categoryList
    .map((category, index) => {
      const isLast = index === categoryList.length - 1;
      if (isLast) {
        return `<span class="text-xs text-gray-500">&gt;</span><span class="text-xs text-gray-600 cursor-default">${category.name}</span>`;
      }
      if (category.type === "category1") {
        return `<span class="text-xs text-gray-500">&gt;</span><button data-breadcrumb="category1" data-category1="${category.name}" class="text-xs hover:text-blue-800 hover:underline">${category.name}</button>`;
      } else if (category.type === "category2") {
        return `<span class="text-xs text-gray-500">&gt;</span><button data-breadcrumb="category2" data-category1="${category.category1}" data-category2="${category.name}" class="text-xs hover:text-blue-800 hover:underline">${category.name}</button>`;
      }
      return "";
    })
    .join("");
};

const ProductSort = (filters) => {
  const currentSort = filters?.sort || "price_asc";
  const options = [
    { value: "price_asc", label: "가격 낮은순" },
    { value: "price_desc", label: "가격 높은순" },
    { value: "name_asc", label: "이름순" },
    { value: "name_desc", label: "이름 역순" },
  ];
  return `
                  <select id="sort-select" class="text-sm border border-gray-300 rounded px-2 py-1
                               focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    ${options
                      .map(
                        (option) =>
                          `<option value="${option.value}" ${
                            currentSort == option.value ? "selected" : ""
                          }>${option.label}</option>`,
                      )
                      .join("")}
                  </select>
`;
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

export const SearchForm = ({ filters, pagination, loading, categories, selectedCategory1, selectedCategory2 }) => {
  console.log(filters);
  // category1이 선택되었으면 category2를 표시, 아니면 category1을 표시
  const categoryButtons = loading
    ? LoadingCategory
    : selectedCategory1
      ? Category2(categories, selectedCategory1, selectedCategory2)
      : Category1(categories, selectedCategory1);

  return `
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
            <!-- 검색창 -->
            <div class="mb-4">
            <div class="relative">
              <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." value="${filters?.search || ""}" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <div id="search-icon" class="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer">
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
                  ${CategoryCrumbs(selectedCategory1, selectedCategory2)}
                </div>

                <!-- 1depth 카테고리 / 2depth 카테고리 -->
                <div class="flex flex-wrap gap-2">
                
                  ${categoryButtons}
                </div>
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
                  ${ProductSort(filters)}
                </div>
              </div>
            </div>
          </div>
  `;
};

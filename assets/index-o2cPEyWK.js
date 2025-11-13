(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();const e=`modulepreload`,t=function(e){return`/front_7th_chapter2-1/`+e},n={},r=function(r,i,a){let o=Promise.resolve();if(i&&i.length>0){let r=function(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))},s=document.getElementsByTagName(`link`),c=document.querySelector(`meta[property=csp-nonce]`),l=c?.nonce||c?.getAttribute(`nonce`);o=r(i.map(r=>{if(r=t(r,a),r in n)return;n[r]=!0;let i=r.endsWith(`.css`),o=i?`[rel="stylesheet"]`:``,c=!!a;if(c)for(let e=s.length-1;e>=0;e--){let t=s[e];if(t.href===r&&(!i||t.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${r}"]${o}`))return;let u=document.createElement(`link`);if(u.rel=i?`stylesheet`:e,i||(u.as=`script`),u.crossOrigin=``,u.href=r,l&&u.setAttribute(`nonce`,l),document.head.appendChild(u),i)return new Promise((e,t)=>{u.addEventListener(`load`,e),u.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${r}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(e=>{for(let t of e||[]){if(t.status!==`rejected`)continue;s(t.reason)}return r().catch(s)})},i=()=>{let e={items:[]},t=[],n=()=>{try{let t=localStorage.getItem(`shopping_cart`);t&&(e.items=JSON.parse(t),i())}catch(e){console.error(`장바구니 데이터 로드 실패:`,e)}},r=()=>{try{localStorage.setItem(`shopping_cart`,JSON.stringify(e.items))}catch(e){console.error(`장바구니 데이터 저장 실패:`,e)}},i=()=>{t.forEach(t=>t(e))},a=n=>(t.push(n),n(e),()=>{t=t.filter(e=>e!==n)}),o=(t,n=1)=>{let a=String(t.productId),o=e.items.findIndex(e=>String(e.productId)===a);o===-1?e.items=[...e.items,{productId:a,title:t.title,image:t.image,lprice:t.lprice,quantity:n,selected:!1}]:e.items=e.items.map((e,t)=>t===o?{...e,quantity:e.quantity+n}:e),r(),i()},s=(t,n)=>{if(n<=0){u(t);return}e.items=e.items.map(e=>e.productId===t?{...e,quantity:n}:e),r(),i()},c=(t,n)=>{n=n===void 0?1:n;let r=e.items.find(e=>e.productId===t);r&&s(t,r.quantity+n)},l=(t,n)=>{n=n===void 0?1:n;let r=e.items.find(e=>e.productId===t);if(!r)return;let i=r.quantity-n;s(t,i<1?1:i)},u=t=>{e.items=e.items.filter(e=>e.productId!==t),r(),i()},d=()=>{e.items=e.items.filter(e=>!e.selected),r(),i()},f=()=>{e.items=[],r(),i()},p=t=>{e.items=e.items.map(e=>e.productId===t?{...e,selected:!e.selected}:e),r(),i()},m=()=>{let t=e.items.every(e=>e.selected);e.items=e.items.map(e=>({...e,selected:!t})),r(),i()},h=()=>e.items.length,g=()=>e.items.filter(e=>e.selected).length,_=()=>e.items.reduce((e,t)=>e+t.lprice*t.quantity,0),v=()=>e.items.filter(e=>e.selected).reduce((e,t)=>e+t.lprice*t.quantity,0),y=()=>({...e});return n(),{subscribe:a,addItem:o,updateQuantity:s,removeItem:u,removeSelectedItems:d,clear:f,toggleSelect:p,toggleSelectAll:m,increaseQuantity:c,decreaseQuantity:l,getItemCount:h,getSelectedCount:g,getTotalPrice:_,getSelectedTotalPrice:v,getState:y}},a=i(),o=()=>{let e=a.getItemCount();return console.log(`장바구니 아이템 개수:`,e),console.log(`장바구니 아이템들:`,a.getState().items),`
    <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
      </svg>
      ${e>0?`<span
        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">${e}</span>`:``}
    </button>
  `},s=()=>`
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-md mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-bold text-gray-900">
            <a href="/" data-link="">쇼핑몰</a>
          </h1>
          <div class="flex items-center space-x-2">
                <!-- 장바구니 아이콘 -->
                ${o()}
              </div>
        </div>
      </div>
    </header>
    `,c=()=>`<footer class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-md mx-auto py-8 text-center text-gray-500">
        <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
      </div>
    </footer>`,l=`
                  <div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>
`,u=(e,t)=>{console.log(e);let n=Object.keys(e);return t?``:`
    ${n.map(e=>`
      <button data-category1="${e}" class="category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
                     bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
        ${e}
      </button>
    `).join(``)}
`},d=(e,t)=>e&&e[t]?(console.log(Object.keys(e[t])),Object.keys(e[t])):[],f=(e,t,n)=>{let r=d(e,t);return!t||r.length===0?``:`
      ${r.map(e=>{let r=n===e,i=`bg-blue-100 border-blue-300 text-blue-800`,a=`bg-white border-gray-300 text-gray-700 hover:bg-gray-50`;return`
        <button data-category1="${t}" data-category2="${e}" class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors ${r?i:a}">
          ${e}
        </button>
      `}).join(``)}
  `},p=(e,t)=>{let n=[];return e&&n.push({name:e,type:`category1`}),t&&n.push({name:t,type:`category2`,category1:e}),n.length===0?``:n.map((e,t)=>{let r=t===n.length-1;return r?`<span class="text-xs text-gray-500">&gt;</span><span class="text-xs text-gray-600 cursor-default">${e.name}</span>`:e.type===`category1`?`<span class="text-xs text-gray-500">&gt;</span><button data-breadcrumb="category1" data-category1="${e.name}" class="text-xs hover:text-blue-800 hover:underline">${e.name}</button>`:e.type===`category2`?`<span class="text-xs text-gray-500">&gt;</span><button data-breadcrumb="category2" data-category1="${e.category1}" data-category2="${e.name}" class="text-xs hover:text-blue-800 hover:underline">${e.name}</button>`:``}).join(``)},m=e=>{let t=e?.sort||`price_asc`,n=[{value:`price_asc`,label:`가격 낮은순`},{value:`price_desc`,label:`가격 높은순`},{value:`name_asc`,label:`이름순`},{value:`name_desc`,label:`이름 역순`}];return`
                  <select id="sort-select" class="text-sm border border-gray-300 rounded px-2 py-1
                               focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    ${n.map(e=>`<option value="${e.value}" ${t==e.value?`selected`:``}>${e.label}</option>`).join(``)}
                  </select>
`},h=e=>{let t=e?.limit||20,n=[10,20,50,100];return`
  <select id="limit-select"
                          class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    ${n.map(e=>`
                    <option value="${e}" ${e==t?`selected`:``}>
                      ${e}개
                    </option>
                    `).join(``)}
                  </select>
`},g=({filters:e,pagination:t,loading:n,categories:r,selectedCategory1:i,selectedCategory2:a})=>{console.log(e);let o=n?l:i?f(r,i,a):u(r,i);return`
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
            <!-- 검색창 -->
            <div class="mb-4">
            <div class="relative">
              <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." value="${e?.search||``}" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
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
                  ${p(i,a)}
                </div>

                <!-- 1depth 카테고리 / 2depth 카테고리 -->
                <div class="flex flex-wrap gap-2">
                
                  ${o}
                </div>
              </div>
              <!-- 기존 필터들 -->
              <div class="flex gap-2 items-center justify-between">
                <!-- 페이지당 상품 수 -->
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600">개수:</label>
                  ${h(t)}
                </div>
                <!-- 정렬 -->
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600">정렬:</label>
                  ${m(e)}
                </div>
              </div>
            </div>
          </div>
  `},_=`
<div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                  <div class="aspect-square bg-gray-200"></div>
                  <div class="p-3">
                    <div class="h-4 bg-gray-200 rounded mb-2"></div>
                    <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div class="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
`,v=`<div class="text-center py-4">
                <div class="inline-flex items-center">
                  <svg class="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span class="text-sm text-gray-600">상품을 불러오는 중...</span>
                </div>
              </div>`,y=({title:e,lprice:t,image:n,productId:r,brand:i})=>`
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"
                     data-product-id="${r}">
                  <!-- 상품 이미지 -->
                  <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
                    <img src="${n}"
                         alt="${e}"
                         class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                         loading="lazy">
                  </div>
                  <!-- 상품 정보 -->
                  <div class="p-3">
                    <div class="cursor-pointer product-info mb-3">
                      <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                        ${e}
                      </h3>
                      <p class="text-xs text-gray-500 mb-2">${i||``}</p>
                      <p class="text-lg font-bold text-gray-900">
                        ${Number(t).toLocaleString()}원
                      </p>
                    </div>
                    <!-- 장바구니 버튼 -->
                    <button class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
                           hover:bg-blue-700 transition-colors add-to-cart-btn" data-product-id="${r}">
                      장바구니 담기
                    </button>
                  </div>
                </div>
    `,b=({loading:e,products:t,pagination:n})=>(console.log(`pagination`,n),`
  <div class="mb-6">
            <div>
            ${e?`
                <!-- 상품 그리드 -->
              <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
                <!-- 로딩 스켈레톤 -->
${_.repeat(4)}
              </div> 
              ${v}`:`<div class="mb-4 text-sm text-gray-600">
                총 <span class="font-medium text-gray-900">${n?.total||0}개</span>의 상품
              </div>
                            <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
                            ${t?.map(y).join(``)||``}
                            </div>
              `}      
            </div>
          </div>
  `),x=({children:e})=>`
  <div class="min-h-screen bg-gray-50">
    ${s()}
            <main class="max-w-md mx-auto px-4 py-4">
                ${e}
            </main>
    ${c()}
    
    </div>
`,S=({filters:e,products:t,pagination:n,loading:r,categories:i,selectedCategory1:a,selectedCategory2:o})=>x({children:`
  ${g({filters:e,pagination:n,loading:r,categories:i,selectedCategory1:a,selectedCategory2:o})}
  ${b({loading:r,products:t,pagination:n})}
  `});async function C(e={}){let{limit:t=20,search:n=``,category1:r=``,category2:i=``,sort:a=`price_asc`}=e,o=e.current??e.page??1,s=new URLSearchParams({page:o.toString(),limit:t.toString(),...n&&{search:n},...r&&{category1:r},...i&&{category2:i},sort:a}),c=await fetch(`/api/products?${s}`);return await c.json()}async function w(e){let t=await fetch(`/api/products/${e}`);return await t.json()}async function T(){let e=await fetch(`/api/categories`);return await e.json()}const E=(e,t)=>!t||t.length===0?`<p class="text-sm text-gray-600">관련 상품이 없습니다.</p>`:t.filter(t=>t.productId!==e.productId).map(e=>`  
  <div class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer" data-product-id="${e.productId}">
                  <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                    <img src="${e.image}" alt="${e.title}" class="w-full h-full object-cover" loading="lazy">
                  </div>
                  <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">${e.title}</h3>
                  <p class="text-sm font-bold text-blue-600">${e.lprice}원</p>
                </div>
  `).join(``),D=({loading:e,product:t,relatedProducts:n=[]})=>`
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <button onclick="window.history.back()" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
            </div>
            <div class="flex items-center space-x-2">
              ${o()}
            </div>
          </div>
        </div>
      </header>
      ${e?`<div class="py-20 bg-gray-50 flex items-center justify-center">
            <div class="text-center">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p class="text-gray-600">상품 정보를 불러오는 중...</p>
            </div>
          </div>`:`
          <main class="max-w-md mx-auto px-4 py-4">
          <!-- 브레드크럼 -->
          <nav class="mb-4">
            <div class="flex items-center space-x-2 text-sm text-gray-600">
              <a href="/" data-link="" class="hover:text-blue-600 transition-colors">홈</a>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
              <button class="breadcrumb-link" data-category1="${t.category1}">
                ${t.category1}
              </button>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
              <button class="breadcrumb-link" data-category1="${t.category1}" data-category2="${t.category2}">
                ${t.category2}
              </button>
            </div>
          </nav>
          <!-- 상품 상세 정보 -->
          <div class="bg-white rounded-lg shadow-sm mb-6">
            <!-- 상품 이미지 -->
            <div class="p-4">
              <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img src="${t.image}" alt="${t.title}" class="w-full h-full object-cover product-detail-image">
              </div>
              <!-- 상품 정보 -->
              <div>
                <p class="text-sm text-gray-600 mb-1"></p>
                <h1 class="text-xl font-bold text-gray-900 mb-3">${t.title}</h1>
                <!-- 평점 및 리뷰 -->
                <div class="flex items-center mb-3">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                  <span class="ml-2 text-sm text-gray-600">${t.rating}.0 (${t.reviewCount}개 리뷰)</span>
                </div>
                <!-- 가격 -->
                <div class="mb-4">
                  <span class="text-2xl font-bold text-blue-600">${Number(t.lprice).toLocaleString()}원</span>
                </div>
                <!-- 재고 -->
                <div class="text-sm text-gray-600 mb-4">
                  재고 ${t.stock}개
                </div>
                <!-- 설명 -->
                <div class="text-sm text-gray-700 leading-relaxed mb-6">
                  ${t.description}
                </div>
              </div>
            </div>
            <!-- 수량 선택 및 액션 -->
            <div class="border-t border-gray-200 p-4">
              <div class="flex items-center justify-between mb-4">
                <span class="text-sm font-medium text-gray-900">수량</span>
                <div class="flex items-center">
                  <button id="quantity-decrease" class="w-8 h-8 flex items-center justify-center border border-gray-300 
                     rounded-l-md bg-gray-50 hover:bg-gray-100">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                    </svg>
                  </button>
                  <input type="number" id="quantity-input" value="1" min="1" max="107" class="w-16 h-8 text-center text-sm border-t border-b border-gray-300 
                    focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <button id="quantity-increase" class="w-8 h-8 flex items-center justify-center border border-gray-300 
                     rounded-r-md bg-gray-50 hover:bg-gray-100">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <!-- 액션 버튼 -->
              <button id="add-to-cart-btn" data-product-id="${t.productId}" class="w-full bg-blue-600 text-white py-3 px-4 rounded-md 
                   hover:bg-blue-700 transition-colors font-medium">
                장바구니 담기
              </button>
            </div>
          </div>
          <!-- 상품 목록으로 이동 -->
          <div class="mb-6">
            <button class="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md 
              hover:bg-gray-200 transition-colors go-to-product-list">
              상품 목록으로 돌아가기
            </button>
          </div>
          <!-- 관련 상품 -->
          <div class="bg-white rounded-lg shadow-sm">
            <div class="p-4 border-b border-gray-200">
              <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
              <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
            </div>
            <div class="p-4">
              <div class="grid grid-cols-2 gap-3 responsive-grid">
                ${E(t,n)}
              </div>
            </div>
          </div>
        </main>
        `}
      ${c()}
    </div>
  `,O=()=>x({children:`
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
      `}),k=e=>e===`success`?`
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
    `:e===`delete`?`
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
    `:e===`reset`?`
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
    `:e===`error`?`
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
    `:``;let A=null;const j=({result:e})=>{if(!e)return;let t=document.querySelector(`#cart-modal-container`),n=t&&!t.classList.contains(`hidden`),r=document.querySelector(`#toast`);r||(r=document.createElement(`div`),r.id=`toast`,r.className=`fixed bottom-4 left-0 right-0 z-50 flex flex-col gap-2 items-center justify-center mx-auto`,r.style.width=`fit-content`),n&&t?(r.parentElement&&r.parentElement!==t&&r.remove(),r.parentElement||t.appendChild(r)):(r.parentElement&&r.parentElement!==document.body&&r.remove(),r.parentElement||document.body.appendChild(r)),r.innerHTML=``,A&&(clearTimeout(A),A=null);let i=document.createElement(`div`);i.innerHTML=k(e);let a=i.firstElementChild,o=a.querySelector(`#toast-close-btn`),s=()=>{a.remove(),A&&(clearTimeout(A),A=null)};o&&o.addEventListener(`click`,s),r.appendChild(a),A=setTimeout(()=>{s(),A=null},3e3)},M=e=>(console.log(e),e&&e.length>0?`
        <div class="flex flex-col max-h-[calc(90vh-120px)]">
            <!-- 전체 선택 섹션 -->
            <div class="p-4 border-b border-gray-200 bg-gray-50">
              <label class="flex items-center text-sm text-gray-700">
                <input type="checkbox" id="cart-modal-select-all-checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2" ${e.every(e=>e.selected)?`checked`:``}>
                전체선택 (${e.length}개)
              </label>
            </div>
            <!-- 아이템 목록 -->
            <div class="flex-1 overflow-y-auto">
              <div class="p-4 space-y-4">
                ${e.map(e=>`
                <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="${e.productId}">
                  <!-- 선택 체크박스 -->
                  <label class="flex items-center mr-3">
                    <input type="checkbox" class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
                  focus:ring-blue-500" data-product-id="${e.productId}" ${e.selected?`checked`:``}>
                  </label>
                  <!-- 상품 이미지 -->
                  <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                    <img src="${e.image}" alt="${e.title}" class="w-full h-full object-cover cursor-pointer cart-item-image" data-product-id="${e.productId}">
                  </div>
                  <!-- 상품 정보 -->
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title" data-product-id="${e.productId}">
                      ${e.title}
                    </h4>
                    <p class="text-sm text-gray-600 mt-1">
                      ${Number(e.lprice).toLocaleString()}원
                    </p>
                    <!-- 수량 조절 -->
                    <div class="flex items-center mt-2">
                      <button class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
                   border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100" data-product-id="${e.productId}">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                        </svg>
                      </button>
                      <input type="number" value="${e.quantity}" min="1" class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
                  border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" disabled="" data-product-id="${e.productId}">
                      <button class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
                   border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100" data-product-id="${e.productId}">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <!-- 가격 및 삭제 -->
                  <div class="text-right ml-3">
                    <p class="text-sm font-medium text-gray-900">
                      ${Number(e.lprice*e.quantity).toLocaleString()}원
                    </p>
                    <button class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800" data-product-id="${e.productId}">
                      삭제
                    </button>
                  </div>
                </div>
                `).join(``)}
              </div>
            </div>
          </div>
          <!-- 하단 액션 -->
          <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
            <!-- 선택된 아이템 정보 -->
            ${e.filter(e=>e.selected).length>0?`
            <div class="flex justify-between items-center mb-3 text-sm">
              <span class="text-gray-600">선택한 상품 (${e.filter(e=>e.selected).length}개)</span>
              <span class="font-medium">${e.filter(e=>e.selected).reduce((e,t)=>e+t.lprice*t.quantity,0).toLocaleString()}원</span>
            </div>
            `:``}
            <!-- 총 금액 -->
            <div class="flex justify-between items-center mb-4">
              <span class="text-lg font-bold text-gray-900">총 금액</span>
              <span class="text-xl font-bold text-blue-600">${e.reduce((e,t)=>e+t.lprice*t.quantity,0).toLocaleString()}원</span>
            </div>
            <!-- 액션 버튼들 -->
            <div class="space-y-2">

              <div class="flex gap-2">
                <button id="cart-modal-clear-cart-btn" class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md 
                         hover:bg-gray-700 transition-colors text-sm">
                  전체 비우기
                </button>
                <button id="cart-modal-checkout-btn" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md 
                         hover:bg-blue-700 transition-colors text-sm">
                  구매하기
                </button>
              </div>
            </div>
          </div>
        `:`
<div class="flex flex-col max-h-[calc(90vh-120px)]">
            <!-- 빈 장바구니 -->
            <div class="flex-1 flex items-center justify-center p-8">
              <div class="text-center">
                <div class="text-gray-400 mb-4">
                  <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">장바구니가 비어있습니다</h3>
                <p class="text-gray-600">원하는 상품을 담아보세요!</p>
              </div>
            </div>
          </div>
`),N=e=>`
    <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4" id="cart-modal-dialog">
        <div class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden">
          <!-- 헤더 -->
          <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
              </svg>
              장바구니 
            </h2>
            
            <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <!-- 컨텐츠 -->
          ${M(e)}
        </div>
      </div>
    `,P=()=>{let e=()=>{let e=document.querySelector(`#cart-modal-container`),t=r();if(e){let n=e.querySelector(`#cart-modal-dialog`);n&&(n.outerHTML=N(t)),e.classList.remove(`hidden`),document.body.style.overflow=`hidden`,s()}else{let e=`
      <div id="cart-modal-container" class="fixed inset-0 z-50 overflow-y-auto cart-modal">
        <div id="cart-modal-overlay" class="fixed inset-0 bg-black bg-opacity-50 transition-opacity cart-modal-overlay"></div>
        ${N(t)}
      </div>
      `,n=document.querySelector(`#root`);n?n.insertAdjacentHTML(`beforeend`,e):document.body.insertAdjacentHTML(`beforeend`,e),document.body.style.overflow=`hidden`,s()}},t=()=>{let e=document.querySelector(`#cart-modal-container`);e&&(e.classList.add(`hidden`),document.body.style.overflow=``)},n=()=>{document.body.addEventListener(`click`,n=>{let r=n.target;if(r.closest(`#cart-icon-btn`)){e();return}if(r.closest(`#cart-modal-close-btn`)){t();return}if(r.id===`cart-modal-overlay`){t();return}}),document.body.addEventListener(`keydown`,e=>{if(e.key===`Escape`){let e=document.querySelector(`#cart-modal-container`);e&&!e.classList.contains(`hidden`)&&t()}})},r=()=>{let e=a.getState().items;return console.log(e),e},i=()=>{let e=r(),t=document.querySelector(`#cart-modal-dialog`);t&&(t.outerHTML=N(e),s())},o=()=>{let e=document.querySelector(`#cart-modal-clear-cart-btn`),t=document.querySelector(`#cart-modal-remove-selected-btn`),n=a.getSelectedCount();if(n>0)if(e&&!t){e.parentElement.insertAdjacentHTML(`beforebegin`,`
          <button id="cart-modal-remove-selected-btn" class="w-full bg-red-600 text-white py-2 px-4 rounded-md 
                         hover:bg-red-700 transition-colors text-sm mb-2">
            선택한 상품 삭제 (${n}개)
          </button>
        `);let t=document.querySelector(`#cart-modal-remove-selected-btn`);t&&t.addEventListener(`click`,()=>{a.removeSelectedItems(),j({result:`delete`}),i()})}else t&&(t.textContent=`선택한 상품 삭제 (${n}개)`);else t&&t.remove()},s=()=>{let e=document.querySelector(`#cart-modal-dialog`);e&&e.addEventListener(`click`,e=>{e.stopPropagation()});let n=document.querySelector(`#cart-modal-close-btn`);n&&n.addEventListener(`click`,()=>{t()});let r=document.querySelector(`#cart-modal-select-all-checkbox`);r&&r.addEventListener(`change`,()=>{a.toggleSelectAll(),i(),o()});let s=document.querySelectorAll(`.cart-item-checkbox`);s.forEach(e=>{e.addEventListener(`change`,()=>{let t=e.dataset.productId;a.toggleSelect(t),i(),o()})});let c=document.querySelectorAll(`.quantity-increase-btn`),l=document.querySelectorAll(`.quantity-decrease-btn`);c.forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.productId;a.increaseQuantity(t),i()})}),l.forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.productId;a.decreaseQuantity(t),i()})});let u=document.querySelectorAll(`.cart-item-remove-btn`);u.forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.productId;a.removeItem(t),i()})});let d=document.querySelector(`#cart-modal-clear-cart-btn`);d&&d.addEventListener(`click`,()=>{a.clear(),j({result:`reset`}),i()})};return{open:e,close:t,init:n}},F=P(),I=()=>{let e=e=>{let t=document.querySelector(`#add-to-cart-btn`);t&&t.addEventListener(`click`,()=>{let t=document.querySelector(`#quantity-input`),n=parseInt(t.value)||1;a.addItem({productId:e.productId,title:e.title,image:e.image,lprice:e.lprice},n),j({result:`success`})})},t=()=>{let e=document.querySelector(`#quantity-increase`),t=document.querySelector(`#quantity-input`);e&&e.addEventListener(`click`,()=>{let e=parseInt(t.value)||1,n=parseInt(t.max)||999,r=Math.min(e+1,n);t.value=r})},n=()=>{let e=document.querySelector(`#quantity-decrease`),t=document.querySelector(`#quantity-input`);e&&e.addEventListener(`click`,()=>{let e=parseInt(t.value)||1,n=parseInt(t.min)||1,r=Math.max(e-1,n);t.value=r})},r=()=>{document.addEventListener(`click`,e=>{if(e.target.classList.contains(`breadcrumb-link`)){if(e.target.dataset.category2){let t=e.target.dataset.category1,n=e.target.dataset.category2;V(`/front_7th_chapter2-1/?category1=${encodeURIComponent(t)}&category2=${encodeURIComponent(n)}`)}else if(e.target.dataset.category1){let t=e.target.dataset.category1;V(`/front_7th_chapter2-1/?category1=${encodeURIComponent(t)}`)}}})};return{insertCart:e,increaseQuantity:t,decreaseQuantity:n,breadCrumb:r}},L=I();var R=class{constructor(){this.currentPage=1,this.isLoading=!1,this.hasMore=!0,this.observer=null,this.currentParams={},this.allProducts=[],this.categories=null,this.selectedCategory1=null,this.selectedCategory2=null}init(){this.reset(),this.setupObserver()}reset(){this.currentPage=1,this.isLoading=!1,this.hasMore=!0,this.allProducts=[],this.currentParams={},this.selectedCategory1=null,this.selectedCategory2=null,this.observer&&(this.observer.disconnect(),this.observer=null)}readCurrentParams(){let e=new URLSearchParams(window.location.search),t=e.get(`category1`),n=e.get(`category2`),r=e.get(`search`),i=document.querySelector(`#search-input`),a=i?i.value:``,o=r||a,s=document.querySelector(`#limit-select`),c=s?parseInt(s.value):20,l=document.querySelector(`#sort-select`),u=l?l.value:`price_asc`;return{category1:t||``,category2:n||``,search:o||``,limit:c,sort:u}}setupObserver(){let e=`/front_7th_chapter2-1/`,t=window.location.pathname,n=t.replace(e,`/`).replace(/\/$/,``)||`/`;if(n!==`/`)return;this.observer&&this.observer.disconnect();let r=document.querySelector(`#products-grid`);if(!r)return;let i=document.querySelector(`#infinite-scroll-loading`);i||(i=document.createElement(`div`),i.id=`infinite-scroll-loading`,i.className=`infinite-scroll-trigger`,i.style.height=`100px`,r.parentElement.appendChild(i),i.innerHTML=``),this.observer=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&!this.isLoading&&this.hasMore&&(this.updateLoadingIndicator(!0),setTimeout(()=>{this.loadNextPage()},0))})},{root:null,rootMargin:`200px`,threshold:.1}),this.observer.observe(i)}async loadNextPage(){if(!(this.isLoading||!this.hasMore)){this.isLoading=!0,this.updateLoadingIndicator(!0);try{let e=this.readCurrentParams(),t=JSON.stringify(e),n=JSON.stringify(this.currentParams);t!==n&&(this.reset(),this.allProducts=[],this.currentParams=e,this.selectedCategory1=e.category1,this.selectedCategory2=e.category2);let r=this.currentPage+1,i=await C({...this.currentParams,page:r});if(this.categories||=await T(),i.products&&i.products.length>0){this.allProducts=[...this.allProducts,...i.products],this.currentPage=r;let e=Math.ceil(i.pagination.total/i.pagination.limit);this.hasMore=r<e,this.updateProductList(i.pagination)}else this.hasMore=!1}catch(e){console.error(`무한 스크롤 로드 실패:`,e),this.hasMore=!1}finally{this.isLoading=!1,this.updateLoadingIndicator(!1)}}}updateLoadingIndicator(e){let t=document.querySelector(`#infinite-scroll-loading`);t&&(e?t.innerHTML=`
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
      `:this.hasMore?t.innerHTML=``:t.innerHTML=`
        <div class="text-center py-4">
          <span class="text-sm text-gray-500">모든 상품을 불러왔습니다.</span>
        </div>
      `)}updateProductList(){let e=document.querySelector(`#products-grid`);if(!e)return;let t=e.children.length,n=this.allProducts.slice(t),r=n.map(e=>`
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"
               data-product-id="${e.productId}">
            <!-- 상품 이미지 -->
            <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
              <img src="${e.image}"
                   alt="${e.title}"
                   class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                   loading="lazy">
            </div>
            <!-- 상품 정보 -->
            <div class="p-3">
              <div class="cursor-pointer product-info mb-3">
                <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                  ${e.title}
                </h3>
                <p class="text-xs text-gray-500 mb-2"></p>
                <p class="text-lg font-bold text-gray-900">
                  ${Number(e.lprice).toLocaleString()}원
                </p>
              </div>
              <!-- 장바구니 버튼 -->
              <button class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
                     hover:bg-blue-700 transition-colors add-to-cart-btn" data-product-id="${e.productId}">
                장바구니 담기
              </button>
            </div>
          </div>
        `).join(``);r&&e.insertAdjacentHTML(`beforeend`,r)}setInitialData(e,t,n,r,i){this.allProducts=e||[],this.currentPage=1,this.categories=n,this.selectedCategory1=r,this.selectedCategory2=i,this.currentParams=this.readCurrentParams();let a=Math.ceil(t.total/t.limit);this.hasMore=this.currentPage<a,setTimeout(()=>{this.setupObserver()},100)}destroy(){this.observer&&(this.observer.disconnect(),this.observer=null);let e=document.querySelector(`#infinite-scroll-loading`);e&&e.remove(),this.reset()}};const z=new R,B=()=>r(async()=>{let{worker:e}=await import(`./browser-CcyfQrG1.js`);return{worker:e}},[]).then(({worker:e})=>e.start({onUnhandledRequest:`bypass`,serviceWorker:{url:`/front_7th_chapter2-1/mockServiceWorker.js`}})),V=e=>{let t=`/front_7th_chapter2-1/`,n=e;e.startsWith(t)&&(n=e.replace(t,`/`).replace(/\/$/,``)||`/`),(n===t||n===`${t}/`||n===`/`)&&(n=`/`);let r=window.location.pathname,i=r.startsWith(t)?r.replace(t,`/`).replace(/\/$/,``)||`/`:r.replace(/\/$/,``)||`/`;i!==n&&(history.pushState(null,null,n),H())},H=async()=>{let e=document.querySelector(`#root`),t=`/front_7th_chapter2-1/`,n=window.location.pathname,r=n.replace(t,`/`).replace(/\/$/,``)||`/`;if(r===`/`)try{z.destroy(),z.init(),e.innerHTML=S({loading:!0});let t=new URLSearchParams(window.location.search),n=t.get(`category1`),r=t.get(`category2`),i=t.get(`search`),a=t.get(`sort`),o=t.get(`limit`),s={};n&&(s.category1=n),r&&(s.category2=r),i&&(s.search=i),a&&(s.sort=a),o&&(s.limit=parseInt(o));let c=await C(s),l=await T();console.log(c),e.innerHTML=S({loading:!1,...c,categories:l,selectedCategory1:n,selectedCategory2:r,filters:{...i&&{search:i},...a&&{sort:a}}}),z.setInitialData(c.products||[],c.pagination||{},l,n,r)}catch{e.innerHTML=O()}else{z.destroy();let t=r.split(`/`).pop();e.innerHTML=D({loading:!0});let n=await w(t),i=await C({category1:n.category1,category2:n.category2});e.innerHTML=D({loading:!1,product:n,relatedProducts:i.products||[]}),L.insertCart(n),L.increaseQuantity(),L.decreaseQuantity(),L.breadCrumb()}};window.addEventListener(`popstate`,()=>{H()}),document.body.addEventListener(`change`,async e=>{console.log(e.target.value);let t=e.target.value,n=document.querySelector(`#root`);if(e.target.id!==`limit-select`)return;let r=new URLSearchParams(window.location.search),i=r.get(`category1`),a=r.get(`category2`),o=r.get(`search`),s=r.get(`sort`),c=`/front_7th_chapter2-1/`,l=new URLSearchParams;i&&l.set(`category1`,i),a&&l.set(`category2`,a),o&&l.set(`search`,o),s&&l.set(`sort`,s),t&&l.set(`limit`,t);let u=`${c}${l.toString()?`?${l.toString()}`:``}`;history.pushState(null,null,u);let d={limit:parseInt(t)};i&&(d.category1=i),a&&(d.category2=a),o&&(d.search=o),s&&(d.sort=s),z.destroy(),z.init(),n.innerHTML=S({loading:!0});let f=await T(),p=await C(d);console.log(p),n.innerHTML=S({loading:!1,...p,categories:f,selectedCategory1:i,selectedCategory2:a,filters:{...o&&{search:o},...s&&{sort:s}}}),z.setInitialData(p.products||[],p.pagination||{},f,i,a)}),document.body.addEventListener(`change`,async e=>{if(e.target.id!==`sort-select`)return;let t=e.target.value,n=document.querySelector(`#root`),r=new URLSearchParams(window.location.search),i=r.get(`category1`),a=r.get(`category2`),o=r.get(`search`),s=r.get(`limit`),c=`/front_7th_chapter2-1/`,l=new URLSearchParams;i&&l.set(`category1`,i),a&&l.set(`category2`,a),o&&l.set(`search`,o),t&&l.set(`sort`,t),s&&l.set(`limit`,s);let u=`${c}${l.toString()?`?${l.toString()}`:``}`;history.pushState(null,null,u);let d={sort:t};i&&(d.category1=i),a&&(d.category2=a),o&&(d.search=o),s&&(d.limit=parseInt(s)),z.destroy(),z.init(),n.innerHTML=S({loading:!0});let f=await T(),p=await C(d);console.log(p),n.innerHTML=S({loading:!1,...p,categories:f,selectedCategory1:i,selectedCategory2:a,filters:o?{search:o}:void 0}),z.setInitialData(p.products||[],p.pagination||{},f,i,a)}),document.body.addEventListener(`scroll`,async()=>{}),document.body.addEventListener(`keydown`,async e=>{let t=e.target;if(t.id===`search-input`&&e.keyCode===13){let e=t.value,n=document.querySelector(`#root`),r=new URLSearchParams(window.location.search),i=r.get(`category1`),a=r.get(`category2`),o={search:e};i&&(o.category1=i),a&&(o.category2=a);let s=`/front_7th_chapter2-1/`,c=new URLSearchParams;i&&c.set(`category1`,i),a&&c.set(`category2`,a),e&&c.set(`search`,e);let l=`${s}${c.toString()?`?${c.toString()}`:``}`;history.pushState(null,null,l),z.destroy(),z.init(),n.innerHTML=S({loading:!0,filters:{search:e},selectedCategory1:i,selectedCategory2:a});let u=await C(o),d=await T();console.log(u),console.log(d),n.innerHTML=S({loading:!1,...u,categories:d,filters:{search:e},selectedCategory1:i,selectedCategory2:a}),z.setInitialData(u.products||[],u.pagination||{},d,i,a)}}),document.body.addEventListener(`click`,async e=>{if(e.target.id===`search-icon`||e.target.closest(`#search-icon`)){let e=document.querySelector(`#search-input`);if(e){let t=e.value,n=document.querySelector(`#root`),r=new URLSearchParams(window.location.search),i=r.get(`category1`),a=r.get(`category2`),o={search:t};i&&(o.category1=i),a&&(o.category2=a);let s=`/front_7th_chapter2-1/`,c=new URLSearchParams;i&&c.set(`category1`,i),a&&c.set(`category2`,a),t&&c.set(`search`,t);let l=`${s}${c.toString()?`?${c.toString()}`:``}`;history.pushState(null,null,l),z.destroy(),z.init(),n.innerHTML=S({loading:!0,filters:{search:t},selectedCategory1:i,selectedCategory2:a});let u=await C(o),d=await T();console.log(u),console.log(d),n.innerHTML=S({loading:!1,...u,categories:d,filters:{search:t},selectedCategory1:i,selectedCategory2:a}),z.setInitialData(u.products||[],u.pagination||{},d,i,a)}}}),document.body.addEventListener(`click`,async e=>{let t=e.target;if(t.classList.contains(`category1-filter-btn`)){let e=t.dataset.category1;console.log(e),V(`/front_7th_chapter2-1/?category1=${encodeURIComponent(e)}`)}if(t.classList.contains(`category2-filter-btn`)){let e=t.dataset.category1,n=t.dataset.category2;console.log(e,n),V(`/front_7th_chapter2-1/?category1=${encodeURIComponent(e)}&category2=${encodeURIComponent(n)}`)}}),document.body.addEventListener(`click`,async e=>{let t=e.target;if(t.hasAttribute(`data-breadcrumb`)){console.log(t.dataset.category1);let e=new URLSearchParams(window.location.search),n=e.get(`search`),r=`/front_7th_chapter2-1/`,i=new URLSearchParams;if(t.dataset.breadcrumb===`reset`)n&&i.set(`search`,n),V(`${r}${i.toString()?`?${i.toString()}`:``}`);else if(t.dataset.breadcrumb===`category1`){let e=t.dataset.category1;i.set(`category1`,e),n&&i.set(`search`,n),V(`${r}?${i.toString()}`)}else if(t.dataset.breadcrumb===`category2`){let e=t.dataset.category1,a=t.dataset.category2;i.set(`category1`,e),i.set(`category2`,a),n&&i.set(`search`,n),V(`${r}?${i.toString()}`)}}});const U=()=>{let e=document.querySelector(`header`);e&&(e.outerHTML=s())};a.subscribe(()=>{U()}),document.body.addEventListener(`click`,e=>{e.target.closest(`.go-to-product-list`)&&(V(`/front_7th_chapter2-1/`),H())}),document.body.addEventListener(`click`,e=>{if(e.target.closest(`.add-to-cart-btn`))return;let t=e.target.closest(`.product-card`)||e.target.closest(`.related-product-card`);if(t){e.preventDefault(),e.stopPropagation();let n=t.dataset.productId,r=`/front_7th_chapter2-1/`,i=r.endsWith(`/`)?`${r}product/${n}`:`${r}/product/${n}`;V(i)}});const W=async e=>{let t=e.target.closest(`.add-to-cart-btn`);if(!t||t.id===`add-to-cart-btn`||(e.stopPropagation(),e.preventDefault(),t.disabled||t.dataset.processing===`true`))return;t.dataset.processing=`true`,t.disabled=!0,console.log(`✅ 메인 리스트 장바구니 버튼 클릭 처리 시작`);let n=t.dataset.productId;try{let e=await w(n);console.log(`📦 메인 리스트에서 addItem 호출`),a.addItem({productId:e.productId,title:e.title,image:e.image,lprice:e.lprice}),console.log(`장바구니 아이템들:`,a.getState().items),j({result:`success`})}finally{t.dataset.processing=`false`,t.disabled=!1}};document.body.addEventListener(`click`,W),console.log(`✅ 장바구니 이벤트 핸들러 등록 완료`);const G=()=>{H(),F.init()};B().then(G);
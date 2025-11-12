import { Homepage } from "./pages/Homepage";
import { getProducts, getProduct, getCategories } from "./api/productApi";
import { DetailPage } from "./pages/Detailpage";

const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker }) => {
    return worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
      },
    });
  });

const push = (path) => {
  history.pushState(null, null, path);
  render();
};

const render = async () => {
  const $root = document.querySelector("#root");
  const basePath = import.meta.env.BASE_URL;
  const pathName = window.location.pathname;
  // base path를 제거한 상대 경로 계산
  const relativePath = pathName.replace(basePath, "/").replace(/\/$/, "") || "/";

  if (relativePath === "/") {
    $root.innerHTML = Homepage({ loading: true });
    const data = await getProducts();
    const categories = await getCategories();
    console.log(data);
    $root.innerHTML = Homepage({ loading: false, ...data, categories });

    document.body.addEventListener("click", (e) => {
      if (e.target.closest(".product-card")) {
        const productId = e.target.closest(".product-card").dataset.productId;
        push(`${import.meta.env.BASE_URL}product/${productId}`);
        render();
      }
    });
  } else {
    const productId = location.pathname.split("/").pop();
    $root.innerHTML = DetailPage({ loading: true });
    const data = await getProduct(productId);
    $root.innerHTML = DetailPage({ loading: false, product: data });
  }
};

//뒤로가기 이벤트 핸들러
window.addEventListener("popstate", render);

// 상품 목록 갯수 클릭 이벤트 핸들러
document.body.addEventListener("change", async (e) => {
  console.log(e.target.value); // 갯수
  const limit = e.target.value;
  const $root = document.querySelector("#root");

  if (e.target.id !== "limit-select") return;
  // limit 값으로 상품목록 재랜더링
  // 상품목록 조회 api의 params에 limit 값 변경
  const params = {
    limit: limit,
  };

  // 로딩상태 표시
  $root.innerHTML = Homepage({ loading: true });

  // 카테고리 조회
  const categories = await getCategories();

  const data = await getProducts(params);
  console.log(data);
  $root.innerHTML = Homepage({ loading: false, ...data, categories });
});

const main = () => {
  render();
};

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}

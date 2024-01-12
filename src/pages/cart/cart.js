import {
  setDocumentTitle,
  comma,
  insertLast,
  getPbImageURL,
  getStorage,
} from '/src/lib';

import '/src/pages/cart/cart.css';

setDocumentTitle('장바구니 - 컬리');

const productData = await getStorage('cart');

/* 보관 유형별 상품 분류 */
productData.forEach((item, index) => {
  if (item.storage === '냉장 (종이포장)') {
    const template = /* html */ `
    <li>
    <input type="checkbox" id="productSelect${index}" class="product-checkbox" checked />
    <label class="product-select" for="productSelect${index}"></label>
      <a href="/">
        <img
          class="thumbnail"
          src="${getPbImageURL(item)}"
          alt=""
        />
        ${item.brand}
      </a>
      <span class="count-box">
        <button class="minus">
          <img
            src="/public/images/detail/minus.svg"
            alt="수량내리기"
          />
        </button>
        <span>1</span>
        <button class="plus">
          <img
            src="/public/images/detail/plus.svg"
            alt="수량올리기"
          />
        </button>
      </span>
      <span class="price">${comma(item.price)}원</span>
      <button class="delete">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21 9.762L20.238 9L15 14.238L9.762 9L9 9.762L14.238 15L9 20.238L9.762 21L15 15.762L20.238 21L21 20.238L15.762 15L21 9.762Z"
            fill="#CCCCCC"
          />
        </svg>
      </button>
    </li>
   `;
    insertLast('.add-fridge', template);
  } else if (item.storage === '냉동 (종이포장)') {
    const template = /* html */ `
    <li>
    <input type="checkbox" id="productSelect${index}" class="product-checkbox" checked />
    <label class="product-select" for="productSelect${index}"></label>
      <a href="/">
        <img
          class="thumbnail"
          src="${getPbImageURL(item)}"
          alt=""
        />
        ${item.brand}
      </a>
      <span class="count-box">
        <button class="minus">
          <img
            src="/public/images/detail/minus.svg"
            alt="수량내리기"
          />
        </button>
        <span>1</span>
        <button class="plus">
          <img
            src="/public/images/detail/plus.svg"
            alt="수량올리기"
          />
        </button>
      </span>
      <span class="price">${comma(item.price)}원</span>
      <button class="delete">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21 9.762L20.238 9L15 14.238L9.762 9L9 9.762L14.238 15L9 20.238L9.762 21L15 15.762L20.238 21L21 20.238L15.762 15L21 9.762Z"
            fill="#CCCCCC"
          />
        </svg>
      </button>
    </li>
   `;
    insertLast('.add-freeze', template);
  } else if (item.storage === '상온 (종이포장)') {
    const template = /* html */ `
    <li>
    <input type="checkbox" id="productSelect${index}" class="product-checkbox" checked />
    <label class="product-select" for="productSelect${index}"></label>
      <a href="/">
        <img
          class="thumbnail"
          src="${getPbImageURL(item)}"
          alt=""
        />
        ${item.brand}
      </a>
      <span class="count-box">
        <button class="minus">
          <img
            src="/public/images/detail/minus.svg"
            alt="수량내리기"
          />
        </button>
        <span>1</span>
        <button class="plus">
          <img
            src="/public/images/detail/plus.svg"
            alt="수량올리기"
          />
        </button>
      </span>
      <span class="price">${comma(item.price)}원</span>
      <button class="delete">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21 9.762L20.238 9L15 14.238L9.762 9L9 9.762L14.238 15L9 20.238L9.762 21L15 15.762L20.238 21L21 20.238L15.762 15L21 9.762Z"
            fill="#CCCCCC"
          />
        </svg>
      </button>
    </li>
   `;
    insertLast('.add-ordinary', template);
  }
});

const selectAllTop = document.getElementById('selectAllTop');
const selectAllBottom = document.getElementById('selectAllBottom');
const productCheckboxes = document.querySelectorAll('.product-checkbox');

function synchronizeCheckboxes() {
  productCheckboxes.forEach((checkbox) => {
    checkbox.checked = this.checked;
  });
}

/* 전체선택 체크 시 상품 전체 체크 */
selectAllTop.addEventListener('change', synchronizeCheckboxes);
selectAllBottom.addEventListener('change', synchronizeCheckboxes);

/* 상하단 전체선택 체크 동기화 */
selectAllTop.addEventListener('change', () => {
  selectAllBottom.checked = selectAllTop.checked;
});

selectAllBottom.addEventListener('change', () => {
  selectAllTop.checked = selectAllBottom.checked;
});

/* 합계 금액 */
let priceEach = 0;
let discountEach = 0;
let priceTotal = 0;
let discountTotal = 0;

productData.forEach(({ price, discount }) => {
  priceEach = price;
  discountEach = discount;
  priceTotal += price;

  const discountPrice = priceEach * (discountEach * 0.01);
  discountTotal += parseInt(discountPrice);
});

let deliveryFee = priceTotal - discountTotal >= 50000 ? 0 : 3000;

const priceTemplate = /* html */ `
<div class="total">
  <div class="price">
   <span>상품금액</span>
   <span>${comma(priceTotal)}원</span>
  </div>
  <div class="dicount">
   <span>상품 할인 금액</span>
   <span>-${comma(parseInt(discountTotal))}원</span>
  </div>
  <div class="delivery-fee">
    <span>배송비</span>
    <span>+${comma(deliveryFee)}원</span>
  </div>
</div>
<div class="total-price">
  <div class="amount">
    <span>결제예정금액</span>
    <span><b>${comma(parseInt(priceTotal - discountTotal))}</b>원</span>
  </div>
  <span class="accumulation">
  <span class="label">적립</span>
  최대 36원 적립 일반 0.1%</span>
</div>
`;
insertLast('.price-container', priceTemplate);

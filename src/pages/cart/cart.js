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
console.log(productData);

productData.forEach((item) => {
  if (item.storage === '냉장 (종이포장)') {
    const template = /* html */ `
    <li>
      <label>
        <input type="checkbox" checked />
        <img src="/public/images/cart/check.svg" alt="상품 선택" />
      </label>
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
      <label>
        <input type="checkbox" checked />
        <img src="/public/images/cart/check.svg" alt="상품 선택" />
      </label>
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
      <label>
        <input type="checkbox" checked />
        <img src="/public/images/cart/check.svg" alt="상품 선택" />
      </label>
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

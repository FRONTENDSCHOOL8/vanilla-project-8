import {
  setDocumentTitle,
  comma,
  insertLast,
  getPbImageURL,
  getStorage,
  getNode,
} from '/src/lib';

import '/src/pages/cart/cart.css';

setDocumentTitle('장바구니 - 컬리');

const productData = await getStorage('cart');

/* 보관 유형별 상품 분류 */
function renderProduct() {
  const productContainer = document.querySelectorAll('.add-product');
  let productData = JSON.parse(localStorage.getItem('cart'));

  productContainer.forEach((container) => {
    container.innerHTML = '';
  });

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
      <button class="delete" id="${item.id}">
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
      <button class="delete" id="${item.id}">
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
      <button class="delete" id="${item.id}">
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
}
renderProduct();

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

/* 상품 삭제 */
const cartContainer = document.querySelector('.cart-container');

cartContainer.addEventListener('click', function (event) {
  if (event.target.closest('.delete')) {
    const clickedButtonId = event.target.closest('.delete').id;
    deleteProduct(clickedButtonId);
  }
});

function deleteProduct(clickedButtonId) {
  let cartData = JSON.parse(localStorage.getItem('cart'));
  if (!Array.isArray(cartData)) {
    cartData = [];
  }
  const clickedProduct = cartData.find((item) => item.id === clickedButtonId);
  const filteredData = cartData.filter((item) => item.id !== clickedButtonId);

  if (clickedProduct) {
    localStorage.setItem('cart', JSON.stringify(filteredData));

    cartData = JSON.parse(localStorage.getItem('cart'));
    renderProduct(cartData);
  }
}

//여기서부터 주소 코드
const adButton = getNode('.edit-address');
const body = getNode('body');

const setSearchAddressEvent = (target, callback) => {
  target.addEventListener('click', handleSetAddress(callback));
};

const handleSetAddress = (callback) => {
  return () => {
    const width = 502;
    const height = 547;
    const popupX = screen.width / 2 - width / 2;
    const popupY = screen.height / 2 - height / 2;
    window.open(
      '/src/pages/address/',
      '_blank',
      `width=${width},height=${height},left=${popupX},top=${popupY}`
    );

    if (callback) {
      callback();
    }
  };
};

const showAddress = async () => {
  const address = JSON.parse(await getStorage('address'));
  const addressP = getNode('.address-p');

  // 기존 주소 템플릿 삭제
  while (addressP.firstChild) {
    addressP.firstChild.remove();
  }

  if (address) {
    const template = document.createElement('span');
    template.textContent = `${address['address']} ${address['detail-address']}`;
    addressP.appendChild(template);
  }
};

setSearchAddressEvent(adButton);
body.addEventListener('mouseover', showAddress);

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

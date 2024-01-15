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

// const productData = getStorage('cart');
let productData = JSON.parse(localStorage.getItem('cart'));

/* 보관 유형별 상품 분류 */
function renderProduct() {
  // let productData = JSON.parse(localStorage.getItem('cart'));
  const productContainer = document.querySelectorAll('.add-product');

  productContainer.forEach((container) => {
    container.innerHTML = '';
  });

  productData.forEach((item, index) => {
    const applyQuantityPrice = item.price * item.quantity;
    if (item.storage === '냉장 (종이포장)') {
      const template = /* html */ `
      <li>
    <input type="checkbox" id="productSelect${index}" data-id="${
      item.id
    }" class="product-checkbox" checked />
    <label class="product-select" for="productSelect${index}" ></label>
      <a href="${`/src/pages/detail/index.html#${item.id}`}">
        <img
          class="thumbnail"
          src="${getPbImageURL(item)}"
          alt=""
        />
        ${item.brand}
      </a>

      <span class="count-box" 
        data-price="${item.price}">
        <button class="minus-button"></button>
        <span class="count">${item.quantity}</span>
        <button class="plus-button"></button>
      </span>
      <span class="price">${comma(applyQuantityPrice)}원</span>
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
    <input type="checkbox" id="productSelect${index}" data-id="${
      item.id
    }" class="product-checkbox" checked />
    <label class="product-select" for="productSelect${index}"></label>
      <a href="${`/src/pages/detail/index.html#${item.id}`}">
        <img
          class="thumbnail"
          src="${getPbImageURL(item)}"
          alt=""
        />
        ${item.brand}
      </a>
      <span class="count-box" 
        data-price="${item.price}"> 
        <button class="minus-button"></button>
        <span class="count">${item.quantity}</span>
        <button class="plus-button"></button>
      </span>
      <span class="price">${comma(applyQuantityPrice)}원</span>
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
    <input type="checkbox" id="productSelect${index}" data-id="${
      item.id
    }" class="product-checkbox" checked />
    <label class="product-select" for="productSelect${index}"></label>
      <a href="${`/src/pages/detail/index.html#${item.id}`}">
        <img
          class="thumbnail"
          src="${getPbImageURL(item)}"
          alt=""
        />
        ${item.brand}
      </a>
      <span class="count-box" 
        data-price="${item.price}">
        <button class="minus-button"></button>
        <span class="count">${item.quantity}</span>
        <button class="plus-button"></button>
      </span>
      <span class="price">${comma(applyQuantityPrice)}원</span>
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

/* 금액 초기 렌더링 */

productData.forEach((product) => {
  product.checked = true;
});

const checkedProductList = productData.filter((product) => product.checked);
renderPrice(checkedProductList);

/* 합계 금액 */
function renderPrice(checkedProductList) {
  let priceEach = 0;
  let discountEach = 0;
  let priceTotal = 0;
  let discountTotal = 0;

  checkedProductList.forEach(({ price, discount }) => {
    priceEach = price;
    discountEach = discount;
    priceTotal += price;

    const discountPrice = priceEach * (discountEach * 0.01);
    discountTotal += parseInt(discountPrice);
  });

  let deliveryFee = priceTotal - discountTotal >= 50000 ? 0 : 3000;

  const priceTemplate = /* html */ `
    <div class="total">
      <div class="price-total">
       <span>상품금액</span>
       <span>${comma(priceTotal)}원</span>
      </div>
      <div class="dicount-total">
       <span>상품 할인 금액</span>
       <span>-${comma(parseInt(discountTotal))}원</span>
      </div>
      <div class="delivery-fee">
        <span>배송비</span>
       <span>+${comma(deliveryFee)}원</span>
      </div>
    </div>
    <div class="total-price">
      <div class="pay-amount">
        <span>결제예정금액</span>
        <span><b>${comma(parseInt(priceTotal - discountTotal))}</b>원</span>
      </div>
      <span class="accumulation">
      <span class="label">적립</span>
      최대 36원 적립 일반 0.1%</span>
    </div>
`;
  document.querySelector('.price-container').innerHTML = priceTemplate;
}

/* 선택 상품만 금액 렌더링 */
const cartContainer = document.querySelector('.cart-container');

cartContainer.addEventListener('change', (event) => {
  if (event.target.classList.contains('product-checkbox')) {
    const checkbox = event.target;
    const productId = checkbox.dataset.id;
    const product = productData.find((item) => item.id === productId);

    product.checked = checkbox.checked;
  }
  const checkedProductList = productData.filter((product) => product.checked);

  renderPrice(checkedProductList);
});

/* 개별 상품 체크 해제 시 전체선택 체크 해제 */
const selectAllTop = document.getElementById('selectAllTop');
const selectAllBottom = document.getElementById('selectAllBottom');
const productCheckboxes = document.querySelectorAll('.product-checkbox');

function updateSelectAll() {
  const allChecked = Array.from(productCheckboxes).every(
    (checkbox) => checkbox.checked
  );
  const anyUnchecked = Array.from(productCheckboxes).some(
    (checkbox) => !checkbox.checked
  );

  if (allChecked) {
    selectAllTop.checked = selectAllBottom.checked = true;
  } else if (anyUnchecked) {
    selectAllTop.checked = selectAllBottom.checked = false;
  }
}
productCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', updateSelectAll);
});

/* 전체선택 체크 시 상품 전체 체크 */
function synchronizeCheckboxes() {
  const selectAll = this.checked;

  productCheckboxes.forEach((checkbox) => {
    checkbox.checked = selectAll;
  });
  productData.forEach((product) => {
    product.checked = selectAll;
  });

  /* 상하단 전체선택 체크 동기화 */
  selectAllTop.checked = selectAllBottom.checked = selectAll;
}
selectAllTop.addEventListener('change', synchronizeCheckboxes);
selectAllBottom.addEventListener('change', synchronizeCheckboxes);

/* 상품 개별 삭제 */
cartContainer.addEventListener('click', (event) => {
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
    renderProduct(filteredData);
    renderPrice(filteredData);
  }
}

/* 수량 버튼 */
const countBoxes = document.querySelectorAll('.count-box');

countBoxes.forEach((countBox) => {
  countBox.addEventListener('click', (event) => {
    let count = event.target.parentElement.querySelector('.count');
    let currentCount = parseInt(count.textContent);
    let pricePerItem = parseInt(countBox.getAttribute('data-price'));

    if (event.target.matches('.minus-button')) {
      if (currentCount > 1) {
        count.textContent = currentCount - 1;
      }
    } else if (event.target.matches('.plus-button')) {
      count.textContent = currentCount + 1;
    }

    /* 수량 x 단가 */
    let total = pricePerItem * parseInt(count.textContent);
    let priceElement = countBox.nextElementSibling; // 가정: 'price' 클래스가 'count-box' 다음에 위치
    priceElement.textContent = comma(total) + '원';
  });
});

/* 배송지 */
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

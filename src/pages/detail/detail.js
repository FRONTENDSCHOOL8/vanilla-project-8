import {
  setDocumentTitle,
  insertFirst,
  insertAfter,
  insertLast,
  getPbImageURL,
  getPbImageURL_2,
  getPbImageURL_3,
  comma,
  getNode,
} from '/src/lib';
import '/src/pages/detail/detail.css';
import pb from '/src/api/pocketbase';

setDocumentTitle('제품명 - 컬리');

async function renderProductData() {
  const hash = window.location.hash.slice(1);

  const productData = await pb.collection('products').getOne(hash);

  const {
    brand,
    price,
    id,
    description,
    discount,
    storage,
    sales_unit,
    weight,
    allergy_info,
    detail_desc,
  } = productData;

  const realPrice = parseInt((price - price * (discount * 0.01)) / 10) * 10;

  const cart = document.querySelector('.add-cart');

  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
  }

  /* localstorage 장바구니에 담기 */
  function sendToCart() {
    let cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const count = document.querySelector('.count');
    const quantity = parseInt(count.textContent);

    const existingProductIndex = cartData.findIndex(
      (product) => product.id === productData.id
    );

    const bubble2 = getNode('.drop-bubble2');
    const product = /* html */ `
    <div class="bubble-text2">
    <img width="40" height="45" src="${getPbImageURL(
      productData
    )}" alt="상품이미지" />
    <div class="bubble-text2-text">
      <p>${brand}</p>
      <span>장바구니에 상품을 담았습니다.</span>
    </div>
  </div>
    `;
    insertLast('.drop-bubble2', product);

    if (!Array.isArray(cartData)) {
      cartData = [];
    }

    let productBubble;

    if (existingProductIndex !== -1) {
      cartData[existingProductIndex].quantity += quantity;
      // 기존 상품의 메시지를 업데이트합니다.
      productBubble = /* html */ `
        <div class="bubble-text2" data-id="${productData.id}">
          <img width="50" height="58" src="${getPbImageURL(
            productData
          )}" alt="상품이미지" />
          <div class="bubble-text2-text">
            <p>${brand}</p>
            <span>장바구니에 상품을 담았습니다.</span><br />
            <span>이미 담은 상품의 수량을 추가 했습니다.</span>
          </div>
        </div>`;
    } else {
      const newProduct = Object.assign({}, productData, { quantity: quantity });
      cartData.push(newProduct);
    }
    bubble2.style.display = 'block';
    setTimeout(() => {
      bubble2.style.display = 'none';
    }, 3000);

    localStorage.setItem('cart', JSON.stringify(cartData));
  }
  cart.addEventListener('click', sendToCart);

  /* 메인 정보 */
  const template = /* html */ `
  <img class="product-img" src="${getPbImageURL(
    productData
  )}" alt="상품 이미지" />
  <div class="product-info">
    <span class="delivery">샛별배송</span><br />
    <span class="desc-1">${brand}</span><br />
    <span class="desc-2">${description}</span><br />
    <span class="real">
    <span class="discount" data-id="${id}">${discount}%</span>
    <span class="real-price">${comma(realPrice)}</span>원
    </span>
    <span class="price" data-id="${id}">${comma(price)}원</span>
    <br class="break" data-id="${id}"/>
    <span class="accumulate">로그인 후, 적립 혜택이 제공됩니다.</span>

    <div class="detail-info-container">
      <p class="delivery-type">
        <span>배송</span>
        <span
          >샛별배송<br />
          <span class="detail">
            23시 전 주문 시 내일 아침 7시 전 도착<br />
            (대구･부산･울산 샛별배송 운영시간 별도 확인)</span
          >
        </span>
      </p>
      <p class="seller">
        <span>판매자</span>
        <span>칼리</span>
      </p>
      <p class="packing-type">
        <span>포장타입</span>
        <span
          >${storage}<br />
          <span class="detail">
            택배배송은 에코 포장이 스티로폼으로 대체됩니다.</span
          >
        </span>
      </p>
      <p class="sales-unit">
        <span>판매단위</span>
        <span>${sales_unit}</span>
      </p>
      <p class="weight">
        <span>중량/용량</span>
        <span>${weight}</span>
      </p>
      <p class="country-of-origin">
        <span>원산지</span>
        <span>상세페이지 별도표기</span>
      </p>
      <p class="allergy-info">
        <span>알레르기정보</span>
        <span class="detail">
          ${allergy_info}</span
        >
      </p>
      <p class="select-product">
        <span>상품선택</span>
        <span class="amount-box">
        ${brand}<br />

          <span class="count-box">
            <button class="minus-button"></button>
            <span class="count">1</span>
            <button class="plus-button"></button>
          </span>

          <span class="real-price">${comma(realPrice)}원</span>
        </span>
      </p>
    </div>

    <div class="total-container">
      <div class="total-price">총 상품금액: <b>${comma(realPrice)}원</b></div>
      <div class="total-accumulate">
        <b class="label">적립</b>로그인 후, 적립 혜택 제공
      </div>
    </div>
  </div>
          `;
  insertFirst('.product-info-container', template);

  /* 상세 정보 */
  const template_2 = /* html */ `
  <img
  class="product-explain-container"
  src = "${getPbImageURL_2(productData)}";
  alt="상품설명"
  />
<div class="explain-description">
  <small>${description}</small>
  <h3>${brand}</h3>
  <p>${detail_desc}</p>
</div>

  `;
  insertAfter('.board-navigation', template_2);

  /* 영양 정보 */
  const template_3 = /* html */ `
  <img
  src = "${getPbImageURL_3(productData)}";
  alt="영양정보"
  />
  `;
  insertAfter('.product-point', template_3);

  /* 할인율 0% 상품 태그 제거 */
  if (productData.discount === 0) {
    const discountElement = document.querySelector(
      `.discount[data-id="${productData.id}"]`
    );
    const priceElement = document.querySelector(
      `.price[data-id="${productData.id}"]`
    );
    const breakElement = document.querySelector(
      `.break[data-id="${productData.id}"]`
    );

    if (discountElement) discountElement.remove();
    if (priceElement) priceElement.remove();
    if (breakElement) breakElement.remove();
  }

  /* 수량 버튼 */
  const countBox = document.querySelector('.count-box');
  countBox.addEventListener('click', function (e) {
    if (e.target.matches('.minus-button')) {
      let count = e.target.parentElement.querySelector('.count');
      let currentCount = parseInt(count.textContent);
      if (currentCount > 1) {
        count.textContent = currentCount - 1;
      }
    } else if (e.target.matches('.plus-button')) {
      let count = e.target.parentElement.querySelector('.count');
      let currentCount = parseInt(count.textContent);
      count.textContent = currentCount + 1;
    }
  });

  /* 수량 x 단가 */
  function calculateTotalPrice() {
    const count = document.querySelector('.count');
    const amount = parseInt(count.textContent);

    const totalPrice = realPrice * amount;

    const totalPriceElement = document.querySelector('.total-price b');
    totalPriceElement.textContent = `${comma(totalPrice)}원`;
  }

  document.addEventListener('DOMContentLoaded', calculateTotalPrice);
  countBox.addEventListener('click', function (e) {
    if (e.target.matches('.minus-button') || e.target.matches('.plus-button')) {
      calculateTotalPrice();
    }
  });
}
renderProductData();

/* 게시판으로 스크롤 이동 */
const reviewButton = document.querySelector('.review');
const reviewBoard = document.querySelector('.review-board');
const contactButton = document.querySelector('.contact');
const qaBoard = document.querySelector('.qa-board');

function goToReview() {
  reviewBoard.scrollIntoView();
}

function goToQa() {
  qaBoard.scrollIntoView();
}
reviewButton.addEventListener('click', goToReview);
contactButton.addEventListener('click', goToQa);

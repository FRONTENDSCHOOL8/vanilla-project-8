import {
  setDocumentTitle,
  insertFirst,
  insertAfter,
  getPbImageURL,
  getPbImageURL_2,
  getPbImageURL_3,
  comma,
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
    description,
    discount,
    storage,
    sales_unit,
    weight,
    allergy_info,
    detail_desc,
  } = productData;

  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
  }

  const cart = document.querySelector('.add-cart');

  /* localstorage 장바구니에 담기 */
  function sendToCart() {
    let cartData = JSON.parse(localStorage.getItem('cart'));
    if (!Array.isArray(cartData)) {
      cartData = [];
    }
    cartData.push(productData);
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
    <span class="discount">${discount}%</span>
    <span class="real-price">${comma(
      parseInt((price - price * (discount * 0.01)) / 100) * 100
    )}</span>원
    </span>
    <span class="price">${comma(price)}원</span><br />
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

          <span class="total-price">${comma(
            parseInt((price - price * (discount * 0.01)) / 100) * 100
          )}원</span>
        </span>
      </p>
    </div>

    <div class="total-container">
      <div class="total-price">총 상품금액: <b>${comma(
        parseInt((price - price * (discount * 0.01)) / 100) * 100
      )}원</b></div>
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

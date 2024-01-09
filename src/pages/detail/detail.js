import {
  setDocumentTitle,
  insertFirst,
  insertAfter,
  getNode,
  getPbImageURL,
  getPbImageURL_2,
  getPbImageURL_3,
  comma,
} from '/src/lib';
import '/src/pages/detail/detail.css';
import pb from '/src/api/pocketbase';

setDocumentTitle('제품명 - 컬리');

async function renderProductData() {
  const cancel = getNode('.cancel');
  const modify = getNode('.modify');

  const hash = window.location.hash.slice(1);

  const productData = await pb.collection('products').getOne(hash);

  const { brand, price, description, discount, storage } = productData;

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
      price - price * (discount * 0.01)
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
        <span>1봉</span>
      </p>
      <p class="weight">
        <span>중량/용량</span>
        <span>123g*4봉</span>
      </p>
      <p class="country-of-origin">
        <span>원산지</span>
        <span>상세페이지 별도표기</span>
      </p>
      <p class="allergy-info">
        <span>알레르기정보</span>
        <span class="detail">
          -대두, 밀, 쇠고기 함유<br />
          -계란, 우유, 메밀, 땅콩, 고등어, 게, 돼지고기, 새우, 복숭아,
          토마토, 아황산류, 호두, 잣, 닭고기, 오징어, 조개류(굴, 전복,
          홍합 포함)를 사용한 제품과 같은 제조시설에서 제조</span
        >
      </p>
      <p class="select-product">
        <span>상품선택</span>
        <span class="amount-box">
        ${brand}<br />
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
          <span class="total-price">${comma(
            price - price * (discount * 0.01)
          )}원</span>
        </span>
      </p>
    </div>

    <div class="total-container">
      <div class="total-price">총 상품금액: <b>${comma(
        price - price * (discount * 0.01)
      )}원</b></div>
      <div class="total-accumulate">
        <b class="label">적립</b>로그인 후, 적립 혜택 제공
      </div>
    </div>
    <div class="button-container">
      <button class="like">
        <img src="/public/images/detail/heart.svg" alt="찜하기 버튼" />
      </button>
      <button class="restock-alarm">
        <img
          src="/public/images/detail/alarm.svg"
          alt="재입고 알림 버튼"
        />
      </button>
      <button class="cart">장바구니 담기</button>
    </div>
  </div>
          `;
  insertFirst('.product-info-container', template);

  const template_2 = /* html */ `
  <img
  class="product-explain-container"
  src = "${getPbImageURL_2(productData)}";
  alt="상품설명"
  />
<div class="explain-description">
  <small>${description}</small>
  <h3>${brand}</h3>
  <p>
    쫄면의 진가는 매콤새콤한 양념과 탱탱한 면발에서 찾을 수 있지요.
    풀무원은 이 맛을 더 부담 없이 즐길 수 있도록 튀기지 않고 만든
    탱탱쫄면을 선보입니다. 밀가루와 감자 전분을 적절히 배합해 탄력이
    좋고, 입에 넣었을 때는 찰지게 씹히죠. 고추장을 넣어 숙성한
    비빔장은 자연스럽고 깊은 맛을 냅니다. 간단하게 조리해 마지막 한
    가닥까지 탱탱한 식감을 즐겨보세요. 취향에 따라 다양한 고명을 올려
    드셔도 좋아요.
  </p>
</div>

  `;
  insertAfter('.board-navigation', template_2);

  const template_3 = /* html */ `
  <img
  class="product-explain-container"
  src = "${getPbImageURL_3(productData)}";
  alt="상품설명"
  />
  `;
  insertAfter('.product-point', template_3);
}

renderProductData();

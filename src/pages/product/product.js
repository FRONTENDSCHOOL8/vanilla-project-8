import '/src/pages/product/product.css';
import {
  tiger,
  insertLast,
  comma,
  getNode,
  getPbImageURL,
  setDocumentTitle,
} from '/src/lib';
import pb from '/src/api/pocketbase';

setDocumentTitle('검색 - 컬리');

async function renderProduct() {
  const response = await tiger.get(
    `${import.meta.env.VITE_PB_API}/collections/products/records`
  );
  const userData = response.data.items;

  userData.forEach((item) => {
    const realPrice =
      parseInt((item.price - item.price * (item.discount * 0.01)) / 10) * 10;
    const template = /* html */ `
            <li class="product-each">
              <button class="list-cart" id="${item.id}"></button>
              <a href="${`/src/pages/detail/index.html#${item.id}`}">
                  <img
                    class="product-img"
                    src="${getPbImageURL(item)}"
                    alt
                  />
                <div class="product-info">
                  <span class="delivery">${
                    item.dawn_package ? '샛별배송' : '판매자배송'
                  }</span><br />
                  <span class="desc-1">${item.brand}</span><br />
                  <span class="discount" data-id="${item.id}">${
                    item.discount
                  }%</span>
                  <span class="real-price">${comma(
                    realPrice
                  )}원</span><br class="break" data-id="${item.id}" />
                  <span class="price" data-id="${item.id}">${comma(
                    item.price
                  )}</span><br/>
                  <span class="desc-2">${item.description}</span><br />
                </div>
                <div class="label-container">
                  <span class="karly-only ${item.karly_only ? '' : 'hidden'}">${
                    item.karly_only ? 'Karly Only' : item.karly_only
                  }</span>
                  <span class="limited ${item.limited ? '' : 'hidden'}">${
                    item.limited ? '한정수량' : item.limited
                  }</span>
                </div>
              </a>
            </li>
            `;
    insertLast('.product-list', template);
  });

  /* 할인율 0% 상품 태그 제거 */
  const discountElements = document.querySelectorAll('.discount');
  const priceElements = document.querySelectorAll('.price');
  const breakElements = document.querySelectorAll('.break');

  userData.forEach((item, index) => {
    if (item.discount === 0) {
      discountElements[index].remove();
      priceElements[index].remove();
      breakElements[index].remove();
    }
  });

  /* 리스트에서 카트 모달 열기 */
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
  }

  const listCart = document.querySelectorAll('.list-cart');
  const modalWrapper = document.querySelector('.modal-wrapper');
  const modalContainer = document.querySelector('.modal-container');
  let clickedProduct = null;

  function showModal(event) {
    const clickedButtonId = event.currentTarget.id;
    clickedProduct = userData.find((item) => item.id === clickedButtonId);
    const realPrice =
      parseInt(
        (clickedProduct.price -
          clickedProduct.price * (clickedProduct.discount * 0.01)) /
          10
      ) * 10;

    const modalTemplate = /* html */ `
  <div
   class="modal-cart"
   role="dialog"
   aria-label="수량선택 후 장바구니 담기">
    <span class="modal-desc-1">${clickedProduct.brand}</span>
    <div class="price-container">
      <div class="small-price">
        <span class="modal-real-price">${comma(realPrice)}원</span>
        <span class="modal-price">${comma(clickedProduct.price)}</span>
      </div>
      <span class="count-box">
        <button class="minus-button"></button>
        <span class="count">1</span>
        <button class="plus-button"></button>
      </span>
    </div>
    <div class="modal-total">
      <span class="total-name">합계</span>
      <span class="total-price">${comma(realPrice)}원</span>
    </div>
    <div class="total-accumulate">
      <span class="label">적립</span>로그인 후, 적립 혜택 제공
    </div>
    <div class="modal-button-container">
      <button class="modal-cancel">취소</button>
      <button class="add-cart">장바구니 담기</button>
    </div>
  </div>
    `;
    insertLast('.modal-container', modalTemplate);

    modalContainer.innerHTML = modalTemplate;
    modalWrapper.style.display = 'block';
    document.body.style.overflow = 'hidden';

    /* 수량 버튼 */
    const countBox = document.querySelector('.count-box');
    let count = document.querySelector('.count');
    countBox.addEventListener('click', (event) => {
      if (event.target.matches('.minus-button')) {
        let currentCount = parseInt(count.textContent);
        if (currentCount > 1) {
          count.textContent = currentCount - 1;
        }
      } else if (event.target.matches('.plus-button')) {
        let currentCount = parseInt(count.textContent);
        count.textContent = currentCount + 1;
      }
    });

    /* 수량 x 단가 */
    function calculateTotalPrice() {
      const count = document.querySelector('.count');
      const currentCount = parseInt(count.textContent);

      const totalPrice = realPrice * currentCount;
      const totalPriceElement = document.querySelector('.total-price');
      totalPriceElement.textContent = `${comma(totalPrice)}원`;
    }

    countBox.addEventListener('click', (event) => {
      if (
        event.target.matches('.minus-button') ||
        event.target.matches('.plus-button')
      ) {
        calculateTotalPrice();
      }
    });
    modalContainer.addEventListener('click', closeModal);
  }

  /* 장바구니 담기 */

  /* -------------------------------------------------------------------------- */
  /*                              장바구니 담기에 메시지창 이식                              */
  /* -------------------------------------------------------------------------- */
  async function sendToCart() {
    let cartData = JSON.parse(localStorage.getItem('cart'));
    if (!Array.isArray(cartData)) {
      cartData = [];
    }

    const count = document.querySelector('.count');
    const quantity = parseInt(count.textContent);
    const bubble2 = getNode('.drop-bubble2');
    const hash = window.location.hash.slice(1);
    const productData = await pb.collection('products').getOne(hash);

    const existingProductIndex = cartData.findIndex(
      (item) => item.id === productData.id
    );

    const { brand } = productData;
    let productBubble = '';

    if (existingProductIndex !== -1) {
      cartData[existingProductIndex].quantity += quantity;
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
      const newProduct = Object.assign({}, productData, {
        quantity: quantity,
      });
      cartData.push(newProduct);
      productBubble = /* html */ `
      <div class="bubble-text2" data-id="${productData.id}">
        <img width="40" height="45" src="${getPbImageURL(
          productData
        )}" alt="상품이미지" />
        <div class="bubble-text2-text">
          <p>${brand}</p>
          <span>장바구니에 상품을 담았습니다.</span>
        </div>
      </div>`;
    }

    localStorage.setItem('cart', JSON.stringify(cartData));
    const existingBubble = bubble2.querySelector(
      `.bubble-text2[data-id="${productData.id}"]`
    );
    if (existingBubble) {
      bubble2.removeChild(existingBubble);
    }

    bubble2.insertAdjacentHTML('beforeend', productBubble);

    bubble2.style.display = 'block';
    setTimeout(() => {
      bubble2.style.display = 'none';
    }, 3000);

    localStorage.setItem('cart', JSON.stringify(cartData));
  }
  modalContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-cart')) {
      sendToCart();
    }
  });

  /* 모달 내부 취소, 장바구니 담기 버튼 눌러서 닫기 */
  function closeModal(event) {
    if (event.target.classList.contains('modal-cancel')) {
      modalWrapper.style.display = 'none';
      document.body.style.overflow = 'auto';
    } else if (event.target.classList.contains('add-cart')) {
      sendToCart();
      modalWrapper.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }

  /* 모달 외부 클릭해서 닫기 */
  window.onclick = (event) => {
    if (event.target == modalContainer) {
      modalWrapper.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  };

  /* 리스트 카트 아이콘 이벤트 리스너 */
  listCart.forEach((listCart) => {
    listCart.addEventListener('click', showModal);
  });
}

renderProduct();

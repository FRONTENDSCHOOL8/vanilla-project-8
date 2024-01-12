import '/src/pages/product/product.css';
import {
  tiger,
  insertLast,
  comma,
  getPbImageURL,
  setDocumentTitle,
} from '/src/lib';

setDocumentTitle('검색 - 컬리');

async function renderProduct() {
  const response = await tiger.get(
    `${import.meta.env.VITE_PB_API}/collections/products/records`
  );
  const userData = response.data.items;

  userData.forEach((item) => {
    const totalPrice =
      parseInt((item.price - item.price * (item.discount * 0.01)) / 100) * 100;
    const template = /* html */ `
            <li class="product-each">
              <button class="add-cart" id="${item.id}"></button>
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
                    totalPrice
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
    } else {
      discountElements[index].textContent = `${item.discount}%`;
    }
  });

  /* 장바구니 담기 */
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
  }

  const cart = document.querySelectorAll('.add-cart');

  function sendToCart(event) {
    const clickedButtonId = event.currentTarget.id;
    const clickedProduct = userData.find((item) => item.id === clickedButtonId);

    let cartData = JSON.parse(localStorage.getItem('cart'));
    if (!Array.isArray(cartData)) {
      cartData = [];
    }
    cartData.push(clickedProduct);
    localStorage.setItem('cart', JSON.stringify(cartData));
  }

  cart.forEach((cart) => {
    cart.addEventListener('click', sendToCart);
  });
}

renderProduct();

import '/src/pages/product/product.css';
import {
  tiger,
  insertLast,
  comma,
  getNode,
  getPbImageURL,
  getStorage,
  setStorage,
  setDocumentTitle,
} from '/src/lib';
import pb from '/src/api/pocketbase';
import defaultCartData from '../../api/defaultCartData';

setDocumentTitle('검색 - 컬리');

async function renderProduct() {
  const response = await tiger.get(
    `${import.meta.env.VITE_PB_API}/collections/products/records`
  );
  const userData = response.data.items;

  userData.forEach((item) => {
    const ratio = item.price * (item.discount * 0.01);
    const template = /* html */ `
            <li class="product-each">
              <button class="cart" type="button"></button>
              <a href="${`/src/pages/detail/index.html#${item.id}`}">
                  <img
                    class="product-img"
                    src="${getPbImageURL(item)}"
                    alt=""
                  />
                <div class="product-info">
                  <span class="delivery">샛별배송</span><br />
                  <span class="desc-1">${item.brand}</span><br />
                  <span class="discount">${item.discount}%</span>
                  <span class="real-price">${comma(
                    item.price - ratio
                  )}원</span> <br />
                  <span class="price">${comma(item.price)}</span><br />
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

            <script>
              const karlyOnly = getNode('karly-only');
              if (item.karly_only === false) {
              karlyOnly.classList.add('hidden')}
            </script>
            `;

    insertLast('.product-list', template);
  });

  //

  //

  if (!localStorage.getItem('cart')) {
    setStorage('cart', defaultCartData);
  }

  const hash = window.location.hash.slice(1);

  const productData = await pb.collection('products').getOne(hash);
  console.log(productData);

  const cart = getNode('.cart');

  function sendToCart() {
    setStorage('cart', productData);
    console.log('꽁꽁');
  }

  cart.addEventListener('click', sendToCart);
}

renderProduct();

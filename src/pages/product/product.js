import '/src/pages/product/product.css';
import {
  tiger,
  insertLast,
  comma,
  getPbImageURL,
  getStorage,
  setStorage,
  setDocumentTitle,
} from '/src/lib';
import defaultAuthData from '/src/api/defaultAuthData';

// import gsap from 'gsap';

setDocumentTitle('검색 - 컬리');

async function renderProduct() {
  const response = await tiger.get(
    `${import.meta.env.VITE_PB_API}/collections/products/records`
  );

  console.log(response);
  const userData = response.data.items;

  const { isAuth } = await getStorage('auth');

  userData.forEach((item) => {
    const ratio = item.price * (item.discount * 0.01);
    const template = /* html */ `
            <li class="product-each">
              <a href="/">
                <figure>
                  <img
                    class="product-img"
                    src="${getPbImageURL(item)}"
                    alt=""
                  />
                  <img
                    class="cart-img"
                    src="/images/product/cart-img.svg"
                    alt=""
                  />
                </figure>
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
                  <span class="karly-only">${item.karly_only}</span>
                  <span class="limited">${item.limited}</span>
                </div>
              </a>
            </li>
            `;
    insertLast('.product-list', template);
  });

  // gsap.from('.product-item', { y: 30, opacity: 0, stagger: 0.1 });
}

renderProduct();

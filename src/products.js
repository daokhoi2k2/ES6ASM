import Screen from "./main";
import { getAllKnifes } from "./models/knifes.model";

const productsScreen = new Screen();
productsScreen.render(document.querySelector(".product-lists"), getAllKnifes, (knife, key) => {
  return `
    <div class="col-lg-4 col-md-6 text-center">
    <div class="single-product-item">
      <div class="product-image">
        <a href="/product-detail.html?id=${key}"
          ><img src="${knife.img_url}" height="261px" alt=""
        /></a>
      </div>
      <h3>${knife.market_hash_name}</h3>
      <p class="product-price">
        <span class="product-description" style="padding: 20px; height: 175px; overflow-y:hidden">${
          knife.description
        }</span>
        ${numeral(knife.price).format("0,0").replaceAll(",", ".") + " đ"}
      </p>
      <a href="#" class="cart-btn"><i class="fas fa-shopping-cart"></i> Chi tiết</a>
    </div>
  </div>
    `;
});

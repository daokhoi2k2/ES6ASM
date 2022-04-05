import { getKnifeByTypeId } from "./models/knifes.model";
import Screen from "./main";

const url_string = window.location.href; //window.location.href
const url = new URL(url_string);
const id = url.searchParams.get("id");
const productListElement = $(".product-lists")[0];

const typeScreen = new Screen();

typeScreen.render(productListElement, () => getKnifeByTypeId(id), (knife, key) => {
    return `<div class="col-lg-4 col-md-6 text-center">
    <div class="single-product-item">
      <div class="product-image">
        <a href="/product-detail.html?id=${key}"
          ><img src="${knife.img_url}" height="261px" alt=""
        /></a>
      </div>
      <h3>${knife.market_hash_name}</h3>
      <p class="product-price">
        <span class="product-description mb-3" id="description">${
          knife.description
        }</span>
        ${knife.price}
      </p>
      <a href="#" class="cart-btn"><i class="fas fa-shopping-cart"></i> Chi tiết</a>
    </div>
  </div>
  `
})
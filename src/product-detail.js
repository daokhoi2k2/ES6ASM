import Screen, { Cart } from "./main";
import { getKnifeById } from "./models/knifes.model";
import { getTypeById } from "./models/type.model";
const url_string = window.location.href; //window.location.href
const url = new URL(url_string);
const id = url.searchParams.get("id");
const productDetailElement = $("#product-detail")[0];

const productDetailScreen = new Screen();
const cart = new Cart();

(async () => {
  await productDetailScreen.renderItem(
    productDetailElement,
    () => getKnifeById(id),
    async (knife) => {
      const response = await getTypeById(knife.typeId);
      const type = response.val();
      return `<div class="container">
      <div class="row">
        <div class="col-md-5">
          <div class="single-product-img">
            <img src="${knife.img_url}" alt="">
          </div>
        </div>
        <div class="col-md-7">
          <div class="single-product-content">
            <h3>${knife.market_hash_name}</h3>
            <p class="single-product-pricing">${numeral(knife.price).format("0,0").replaceAll(",", ".") + " đ"}</p>
            <p>
              ${knife.description}
            </p>
            <div class="single-product-form">
              <form action="index.html">
                <input type="number" min="1" id="amount" value="1">
              </form>
              <a id="addCardBtn" data-key="${response.key}" data-market_hash_name="${knife.market_hash_name}" data-price="${knife.price}" data-img_url="${knife.img_url}" class="cart-btn"><i class="fas fa-shopping-cart"></i> Thêm vào giỏ</a>
              <p><strong>Categories: </strong>${type.name}</p>
            </div>
            <h4>Share:</h4>
            <ul class="product-share">
              <li>
                <a href=""><i class="fab fa-facebook-f"></i></a>
              </li>
              <li>
                <a href=""><i class="fab fa-twitter"></i></a>
              </li>
              <li>
                <a href=""><i class="fab fa-google-plus-g"></i></a>
              </li>
              <li>
                <a href=""><i class="fab fa-linkedin"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>`;
    }
  );

  const addCardBtn = document.getElementById("addCardBtn");
  const amountEle = document.getElementById("amount");
  addCardBtn.onclick = (e) => {
    cart.addCart(id, {
      market_hash_name: addCardBtn.dataset.market_hash_name,
      amount: +amountEle.value,
      price:  +addCardBtn.dataset.price,
      img_url: addCardBtn.dataset.img_url
    });

    productDetailScreen.toast("Thêm sản phẩm vào giỏ hàng thành công", "success");
  };
})();

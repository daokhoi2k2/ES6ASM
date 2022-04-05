import { Cart } from "./main";
const cart = new Cart();

(async () => {
  const htmlRender = (product) => `<tr class="table-body-row">
    <td><i data-id=${product.id}  class="far fa-window-close product-remove"></i></td>
    <td class="product-image"><img src="${product.img_url}" alt=""></td>
    <td class="product-name">${product.market_hash_name}</td>
    <td class="product-price">${numeral(product.price).format("0,0").replaceAll(",", ".")} đ</td>
    <td class="product-quantity"><input min="1" type="number" class="changeAmountBtn" data-price="${
      product.price
    }" data-id="${product.id}" value="${product.amount}"></td>
    <td class="product-total">${numeral(product.price * product.amount)
      .format("0,0")
      .replaceAll(",", ".")} đ</td>
</tr>`;

  cart.renderCart((product) => {
    return htmlRender(product);
  });

  const handleRemove = (e) => {
    const trElement = e.target.parentElement.parentElement;
    const id = e.target.dataset.id;
    trElement.remove();
    cart.removeCart(id);

    // Thay đổi tổng tiền
    const totalElement = $("#total")[0];
    cart.changeTotal(totalElement);
    cart.save();
    // cart.renderTotalCheckOut();
  };

  const handleChangeAmount = (e) => {
    const totalRow = $($(e.target.parentElement)[0]).next()[0];
    if (e.target.value <= 0) {
      e.target.value = 1;
    }
    totalRow.innerText =
      numeral(e.target.value * e.target.dataset.price)
        .format("0,0")
        .replaceAll(",", ".") + " đ";

    // add lại event sau khi bị ghi đè
    e.target.addEventListener("change", handleChangeAmount);
    cart.changeAmount(e.target.dataset.id, e.target);
    cart.renderTotalCheckOut();
    cart.save();
  };

  const changeAmountBtn = $(".changeAmountBtn");
  const removeProductBtn = $(".product-remove");

  for (let i = 0; i < changeAmountBtn.length; i++) {
    changeAmountBtn[i].addEventListener("change", handleChangeAmount);
    removeProductBtn[i].addEventListener("click", handleRemove);
  }
})();

cart.renderTotalCheckOut();

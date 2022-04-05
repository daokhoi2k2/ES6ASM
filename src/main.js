import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
export default class Screen {
  render = async (target, promiseFireBase, callback, additionalRender = "") => {
    const res = await promiseFireBase();

    const data = res.val();

    // const result = res.val().map(props => callback(props)).join(""); Explain code under
    const result = Object.keys(res.val())
      .map((item) => {
        return callback(data[item], item);
      })
      .join("");

    target.innerHTML = additionalRender + result;
  };

  renderItem = async (target, promiseFireBase, callback) => {
    const res = await promiseFireBase();

    const result = await callback(res.val());

    target.innerHTML = result;
  };

  toast = (msg, status) => {
    // IIFE
    const color = (() => {
      switch (status) {
        case "success":
          return "#28a745";
        case "warning":
          return "#ffc107";
        case "danger":
          return "#dc3545";
        default:
          return "#28a745";
      }
    })();

    // Show toastify
    Toastify({
      text: msg,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: color,
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  };
}

export class Cart {
  constructor() {
    this.store = JSON.parse(localStorage.getItem("cart")) || [];
  }

  getCart() {
    return this.store;
  }

  addCart(id, data) {
    // Check sản phẩm đã có trong giỏ hàng chưa
    const indexProductInCart = this.store.findIndex((item) => {
      return item.id === id;
    });

    // Xử lý nếu chưa sản phẩm đó chưa có trong giỏ hàng
    if (indexProductInCart === -1) {
      this.store.push({
        id,
        market_hash_name: data.market_hash_name,
        amount: data.amount,
        price: data.price,
        img_url: data.img_url,
      });
    } else {
      // Cộng vào số lượng nếu sản phẩm bị trùng
      this.store[indexProductInCart] = {
        ...this.store[indexProductInCart],
        amount: this.store[indexProductInCart].amount + data.amount,
      };
    }
    // Lưu lại vào localStorage
    this.save();
  }

  save() {
    localStorage.setItem("cart", JSON.stringify(this.store));
  }

  getTotal() {
    return this.store.reduce((acc, cur, index) => {
      return acc + cur.price * cur.amount;
    }, 0);
  }

  removeCart(id) {
    const indexProductInCart = this.store.findIndex((item) => {
      return item.id === id;
    });

    // Ref type
    this.store.splice(indexProductInCart, 1);
  }

  changeTotal(element) {
    element.innerHTML = numeral(this.getTotal()).format("0,0").replaceAll(",", ".") + " đ";
  }

  changeAmount(id, element) {
    // Check sản phẩm đã có trong giỏ hàng chưa
    const indexProductInCart = this.store.findIndex((item) => {
      return item.id === id;
    });

    this.store[indexProductInCart] = {
      ...this.store[indexProductInCart],
      amount: +element.value, // + để ép kiểu nhanh
    };
  }

  renderCart(callback) {
    const cartElement = $("#cart")[0];
    const html = this.store
      .map((product) => {
        return callback(product);
      })
      .join("");

    cartElement.innerHTML = html;
  }

  renderTotalCheckOut() {
    const totalElement = $("#total")[0];
    totalElement.innerHTML = numeral(this.getTotal()).format("0,0").replaceAll(",", ".") + " đ";
  }

  renderCartDetail() {
    const cartElement = $("#order-details")[0];
    const html = this.store
      .map((item) => {
        return `<tr>
          <td>${item.market_hash_name}</td>
          <td>${numeral(item.price * item.amount)
            .format("0,0")
            .replaceAll(",", ".")} đ</td>
      </tr>`;
      })
      .join("");

    cartElement.innerHTML = html;
  }

  renderTotalCartDetail() {
    const total = $("#total")[0];
    total.innerHTML = numeral(this.getTotal()).format("0,0").replaceAll(",", ".") + " đ";
  }

  clear() {
    this.store = [];
    this.save();
  }
}

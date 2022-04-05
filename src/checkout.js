import { Cart } from "./main";
import { addOrder } from "./models/orders.model";

const cart = new Cart();
cart.renderCartDetail();
cart.renderTotalCartDetail();
const orderBtn = $("#orderBtn")[0];

// Check if order empty remove btn
const handleOrder = () => {
  if (cart.getCart().length === 0) {
    orderBtn.remove();
  }
};

handleOrder();

const handlePayment = async () => {
  const orderElement = $("#order")[0];

  // GET VALUE FORM
  const fullName = $("[name= 'fullName']")[0];
  const email = $("[name = 'email']")[0];
  const address = $("[name = 'address']")[0];
  const phone = $("[name = 'phone']")[0];
  const request = $("[name = 'request']")[0];

  // Err Msg
  const fullNameErrMsg = $("#fullNameErrMsg")[0];
  const emailErrMsg = $("#emailErrMsg")[0];
  const addressErrMsg = $("#addressErrMsg")[0];
  const phoneErrMsg = $("#phoneErrMsg")[0];

  // Clear msg
  fullNameErrMsg.innerHTML = "";
  emailErrMsg.innerHTML = "";
  addressErrMsg.innerHTML = "";
  phoneErrMsg.innerHTML = "";

  // Validate form
  if (!fullName.value || !email.value || !address.value || !phone.value) {
    if (!fullName.value) {
      fullNameErrMsg.innerHTML = "Vui lòng nhập trường này";
    }

    if (!email.value) {
      emailErrMsg.innerHTML = "Vui lòng nhập trường này";
    }

    if (!address.value) {
      addressErrMsg.innerHTML = "Vui lòng nhập trường này";
    }

    if (!phone.value) {
      phoneErrMsg.innerHTML = "Vui lòng nhập trường này";
    }

    // Validate email
    if (!email.value.match(/(.+)@(.+){2,}\.(.+){2,}/)) {
      emailErrMsg.innerHTML = "Không đúng định dạng email";
    }

    return;
  }

  const result = await addOrder({
    fullName: fullName.value,
    email: email.value,
    address: address.value,
    phone: phone.value,
    request: request.value,
    total: cart.getTotal(),
    listProduct: cart.getCart(),
  })

  console.log("Result", result)

  orderElement.reset();
  cart.clear();
  cart.renderCartDetail();
  cart.renderTotalCartDetail();
  handleOrder();

  Toastify({
    text: "Đặt hàng thành công",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
};

orderBtn.addEventListener("click", handlePayment)
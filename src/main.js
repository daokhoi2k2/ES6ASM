import "toastify-js/src/toastify.css"
import Toastify from "toastify-js"
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

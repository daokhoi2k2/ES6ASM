import { getAllTypes } from "./models/type.model";
import { addKnife, getKnifeById } from "./models/knifes.model";
import Screen from "./main";

const url = new URL(window.location.href);
const id = url.searchParams.get("id");

const addKnifeScreen = new Screen();
const formElement = document.querySelector("#addKnife");
const market_hash_name = document.querySelector("#market_hash_name");
const price = document.querySelector("#price");
const typeId = document.querySelector("#knifeType");
const description = document.querySelector("#description");
const isShow = document.querySelector("#isShow");

// IIFE
(async (id) => {
  const res = await getKnifeById(id);
  const knife = res.val();
  const base64Url = knife.img_url;

  addKnifeScreen.render(document.querySelector("#knifeType"), getAllTypes, ({ name }, key) => {
    return `<option value='${key}' ${knife.typeId === key ? "selected" : ""}>${name}</option>`;
  });
  
  market_hash_name.value = knife.market_hash_name;
  price.value = knife.price
  description.value = knife.description;
  isShow.checked = knife.isShow; 
})(id);

const handleUpdateKnife = (e) => {
  e.preventDefault();

  const imgFile = document.querySelector("#knifeImg").files[0];

  var reader = new FileReader();
  reader.readAsDataURL(imgFile);
  reader.onload = async () => {
    const result = await updateKnife(id, {
      market_hash_name: market_hash_name.value,
      price: +price.value,
      typeId: typeId.value,
      img_url: reader.result || base64Url,
      description: description.value,
      isShow: isShow.value
    });

    if(result) {
      screen.toast("Thêm sản phẩm thành công!", "success");
    } else {
      screen.toast("Thêm sản phẩm thất bại!", "danger");
    }

    // Reset form
    formElement.reset();
  };
};

formElement.addEventListener("submit", handleUpdateKnife);

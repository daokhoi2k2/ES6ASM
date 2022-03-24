import { getAllTypes } from "./models/type.model";
import { addKnife } from "./models/knifes.model";
import Screen from "./main";

const addKnifeScreen = new Screen();
const formElement = document.querySelector("#addKnife");
const screen = new Screen();

addKnifeScreen.render(document.querySelector("#knifeType"), getAllTypes, ({ name }, key) => {
  return `<option value='${key}'>${name}</option>`;
});

const handleAddKnife = (e) => {
  e.preventDefault();
  const market_hash_name = document.querySelector("#market_hash_name").value;
  const price = +document.querySelector("#price").value;
  const typeId = document.querySelector("#knifeType").value;
  const imgFile = document.querySelector("#knifeImg").files[0];
  const description = document.querySelector("#description").value;
  const isShow = document.querySelector("#isShow").checked;

  var reader = new FileReader();
  reader.readAsDataURL(imgFile);
  reader.onload = async () => {
    const result = await addKnife({
      market_hash_name,
      price,
      typeId,
      img_url: reader.result,
      description,
      isShow,
      createdAt: Date.now(),
      volume: 0
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

formElement.addEventListener("submit", handleAddKnife);

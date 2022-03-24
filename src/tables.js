import { getAllTypes } from "./models/type.model";
import { getAllKnifes, deleteKnife } from "./models/knifes.model";
import Screen from "./main";

const tableScreen = new Screen();

tableScreen.render(
  document.querySelector("#types"),
  getAllTypes,
  ({ name }, key) => {
    return `<option value='${key}'>${name}</option>`;
  },
  "<option value='-1'>Tất cả</option>"
);


const syncProcess = async () => {
  await tableScreen.render(document.querySelector("#knifes"), getAllKnifes, (knife, key) => {
    return `<tr>
          <td>
            <div class="d-flex px-2">
              <div>
                <img src="${
                  knife.img_url
                }" class="avatar avatar-sm rounded-circle me-2" alt="spotify">
              </div>
              <div class="my-auto">
                <h6 class="mb-0 text-sm">
                  ${knife.market_hash_name}
                </h6>
              </div>
            </div>
          </td>
          <td>
            <p class="text-sm font-weight-bold mb-0">
              ${knife.price} ₫
            </p>
          </td>
          <td class="align-middle text-center text-sm">
            <span class="badge badge-sm bg-gradient-success ${
              knife.isShow ? "bg-gradient-success" : "bg-gradient-danger"
            }">
              ${knife.isShow ? "Hiện thị" : "Ẩn"}
            </span>
          </td>
          <td class="align-middle text-center">
            <div class="d-flex align-items-center justify-content-center">
              <span class="me-2 text-xs font-weight-bold">${knife.volume}</span>
              <div>
                <div class="progress">
                  <div class="progress-bar bg-gradient-warning" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100" style="width: ${knife.volume}%"></div>
                </div>
              </div>
            </div>
          </td>
          <td class="align-middle">
            <button class="btn btn-link text-secondary mb-0 modifier__btn" style="position: relative; overflow: visible">
              <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
              <ul class="modifier__list">
                <a href="/admin/update-knife.html?id=${key}" class="modifier__item">Sửa</a>
                <li data-key='${key}' class="modifier__item modifier__delete">Xóa</li>
              </ul>
            </button>
          </td>
        </tr>`;
  });
  
  document.querySelectorAll(".modifier__delete").forEach((element) => 
    element.addEventListener("click", async (e) => {
      const key = element.dataset.key;
      await deleteKnife(key);
      e.target.parentNode.parentNode.parentNode.parentNode.remove();
      tableScreen.toast("Xóa sản phẩm thành công!", "success");

      
    })
  )
  
}

syncProcess() 
const ulEle = document.querySelector("#type-nav");

import Screen from "./main";
import { getAllTypes } from "./models/type.model";

const indexScreen = new Screen();

indexScreen.render(
  ulEle,
  getAllTypes,
  ({ name }, key) => {
    return  `<li><a href="/type.html?id=${key}">${name}</a></li>`;
  },
);

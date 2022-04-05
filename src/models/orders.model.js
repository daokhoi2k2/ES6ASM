import {
    getDatabase,
    ref,
    get,
    child,
    push,
    update,
    remove,
    equalTo,
    query,
    orderByChild,
  } from "firebase/database";
  import database, { dbRef } from "../db.js";
  
  export const getAllOrders = () => {
    return get(child(dbRef, `orders`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot;
        } else {
          throw new Error("No data available");
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  
  export const addOrder = (data) => {
    const db = getDatabase();
    return push(ref(db, "oders/"), data)
      .then((res) => {
        console.log("Thành công", res);
        return res.key;
      })
      .catch((err) => {
        console.log("Lỗi", err);
        throw new Error("Lỗi khi thêm sản phẩm vào firebase");
      });
  };
  
  
import { getDatabase, ref, get, child, set, push, query } from "firebase/database";
import database, {dbRef} from "../db.js"

export const getAllKnifes = () => {
  return get(child(dbRef, `knifes`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot;
      } else {
        throw new Error("No data available");
      }
    })
    .catch((error) => {
      throw new Error(error)
    });
};

export const addKnife = (data) => {
  const db = getDatabase();
  return push(ref(db, 'knifes/'), data)
    .then((res) => {
      console.log("Thành công", res);
      return res.key
    })
    .catch((err) => {
      console.log("Lỗi", err)
      throw new Error("Lỗi khi thêm sản phẩm vào firebase");
    })

}

export const getKnifeById = (id) => {
  // const db = getDatabase();
  return get(child(dbRef, `knifes/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot;
      } else {
        throw new Error("No data available");
      }
    })
    .catch((error) => {
      throw new Error(error)
    });
}


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
      throw new Error(error);
    });
};

export const addKnife = (data) => {
  const db = getDatabase();
  return push(ref(db, "knifes/"), data)
    .then((res) => {
      console.log("Thành công", res);
      return res.key;
    })
    .catch((err) => {
      console.log("Lỗi", err);
      throw new Error("Lỗi khi thêm sản phẩm vào firebase");
    });
};

export const updateKnife = async (id, data) => {
  await update(child(dbRef, `knifes/${id}`), data);
  return true;
};

export const deleteKnife = async (id) => {
  await remove(child(dbRef, `knifes/${id}`));
};

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
      throw new Error(error);
    });
};

export const getKnifeByTypeId = async (typeId) => {
  const dataSnapshot = await get(
    query(child(dbRef, `knifes`), orderByChild("typeId"), equalTo(typeId))
  );
  return dataSnapshot;
};

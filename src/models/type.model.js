import { getDatabase, ref, get, child } from "firebase/database";
import database, {dbRef} from "../db.js"

export const getAllTypes = () => {
  return get(child(dbRef, `types`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot;
      } else {
        throw new Error("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

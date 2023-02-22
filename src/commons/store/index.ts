import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

export const moduleState = atom({
  key: `moduleState/${uuidv4()}`,
  default: "",
});

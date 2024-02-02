import axios from "axios";

export const rajaAxios = axios.create({
  baseURL: "https://api.rajaongkir.com/starter",
  headers: {
    key: "38ea942fe42bbf0f0e363fef17e32ab7",
  },
});

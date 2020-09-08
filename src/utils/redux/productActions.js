import { FETCH_PRODUCTS } from "../types";

export const fetchProducts = () => async (dispath) => {
  const res = await (await fetch("/api/products")).json();
  console.log(res)
  dispath({
    type: FETCH_PRODUCTS,
    payload: res,
  });
};

import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
} from "../types";

export const fetchProducts = () => async (dispath) => {
  const res = await (await fetch("/api/products")).json();
  console.log(res);
  dispath({
    type: FETCH_PRODUCTS,
    payload: res,
  });
};

export const filterProducts = (products, size) => (dispath) => {
  dispath({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size,
      items:
        size === ""
          ? products
          : products.filter((x) => x.availableSizes.indexOf(size) > 0),
    },
  });
};
export const sortProducts = (filterProducts, sort) => (dispath) => {
  const sortProducts = filterProducts.slice();
  dispath({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort,
      items: sortProducts.sort((a, b) =>
        sort === "lowest"
          ? a.price < b.price
            ? 1
            : -1
          : sort === "highest"
          ? a.price > b.price
            ? 1
            : -1
          : a._id < b._id
          ? 1
          : -1
      ),
    },
  });
};

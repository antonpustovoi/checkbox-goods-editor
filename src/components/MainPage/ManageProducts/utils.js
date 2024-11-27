import { getNumberValue } from "utils";

export const getInitialProduct = () => {
  const initialProduct = {
    code: Date.now(),
    name: "",
    price: 0,
    is_weight: false,
    related_barcodes: "",
  };
  return {
    ...initialProduct,
    purchasePrice: 0,
    quantity: 1,
    margin: 25,
    marked: false,
    original: initialProduct,
  };
};

export const getPrice = (purchasePrice, quantity, margin) =>
  getNumberValue((purchasePrice / quantity) * (1 + margin / 100));

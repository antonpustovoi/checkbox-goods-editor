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
    margin: 25,
    marked: false,
    original: initialProduct,
  };
};

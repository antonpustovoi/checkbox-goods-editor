import { createContext, useContext } from "react";

export const ProductsContext = createContext({});

export const useProductsContext = () => {
  const { products, setProducts } = useContext(ProductsContext);

  const getIndex = (code) =>
    products.findIndex((product) => product.code === code);

  const addProduct = (index, data) =>
    setProducts((draftProducts) => {
      draftProducts.splice(index, 0, data);
    });

  const setProduct = (index, data) =>
    setProducts((draftProducts) => {
      draftProducts[index] = data;
    });

  const filterProducts = (callback) =>
    setProducts((draftProducts) => draftProducts.filter(callback));

  const swapProducts = (firstIndex, secondIndex) =>
    setProducts((draftProducts) => {
      [draftProducts[firstIndex], draftProducts[secondIndex]] = [
        draftProducts[secondIndex],
        draftProducts[firstIndex],
      ];
    });

  const updateProduct = (code, callback) => {
    setProducts((draftProducts) => {
      callback(draftProducts.find((product) => product.code === code));
    });
  };

  return {
    products,
    setProducts,
    getIndex,
    addProduct,
    setProduct,
    updateProduct,
    filterProducts,
    swapProducts,
  };
};

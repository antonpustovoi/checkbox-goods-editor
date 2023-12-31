import { createContext, useContext } from "react";

export const ProductsContext = createContext({});

export const useProductsContext = () => useContext(ProductsContext);

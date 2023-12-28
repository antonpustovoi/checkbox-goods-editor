import { createContext, useContext } from "react";

export const GoodsContext = createContext({});

export const useGoodsContext = () => useContext(GoodsContext);

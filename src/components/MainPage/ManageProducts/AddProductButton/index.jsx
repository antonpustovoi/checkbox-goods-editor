import { Button } from "@mui/material";

import { useProductsContext } from "../ProductsContext";
import { getInitialProduct } from "../utils";

export function AddProductButton() {
  const { products, addProduct } = useProductsContext();

  const handleClick = () =>
    addProduct(products.length - 1, getInitialProduct());

  return <Button onClick={handleClick}>Додати новий продукт</Button>;
}

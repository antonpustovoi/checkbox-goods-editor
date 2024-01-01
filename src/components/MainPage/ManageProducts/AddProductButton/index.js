import { Button } from "@mui/material";

import { useProductsContext } from "../ProductsContext";

export function AddProductButton() {
  const { setProducts } = useProductsContext();

  const handleClick = () =>
    setProducts((draftProducts) => {
      const initProduct = {
        code: Date.now(),
        name: "",
        price: 0,
        is_weight: false,
        related_barcodes: ""
      };
      const initialValues = {
        ...initProduct,
        purchasePrice: 0,
        margin: 25,
        marked: false,
        original: initProduct
      };
      draftProducts.push(initialValues);
    });

  return <Button onClick={handleClick}>Додати новий продукт</Button>;
}

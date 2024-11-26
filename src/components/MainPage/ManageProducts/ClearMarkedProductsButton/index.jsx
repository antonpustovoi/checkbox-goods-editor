import { Button } from "@mui/material";

import { useProductsContext } from "../ProductsContext";

export function ClearMarkedProductsButton() {
  const { products, filterProducts } = useProductsContext();

  const isDisabled = products.every((product) => !product.marked);

  const handleClick = () => filterProducts((product) => !product.marked);

  return (
    <Button disabled={isDisabled} onClick={handleClick}>
      Очистити маркованні продукти
    </Button>
  );
}

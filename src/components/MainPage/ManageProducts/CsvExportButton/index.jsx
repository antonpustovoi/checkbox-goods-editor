import { Button } from "@mui/material";

import { exportToCsvFile } from "utils";

import { useProductsContext } from "../ProductsContext";

export function CsvExportButton() {
  const { products } = useProductsContext();

  const handleClick = () => exportToCsvFile(products);

  return (
    <Button disabled={!products.length} onClick={handleClick}>
      Експорт
    </Button>
  );
}

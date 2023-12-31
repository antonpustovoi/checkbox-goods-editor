import { Button } from "@mui/material";
import Papa from "papaparse";

import { useProductsContext } from "../ProductsContext";

export function CsvImportButton() {
  const { setProducts } = useProductsContext();

  const handleComplete = (results) => {
    const data = [];
    results.data.forEach((el, index) => {
      if (!index) return;
      const [
        code,
        name,
        purchasePrice,
        margin,
        price,
        is_weight,
        related_barcodes
      ] = el;
      const initData = {
        code,
        name,
        price: null,
        is_weight: is_weight === "true",
        related_barcodes: related_barcodes
      };
      data.push({
        ...initData,
        purchasePrice: Number(purchasePrice),
        margin: Number(margin),
        price: Number(price),
        marked: false,
        original: initData
      });
    });
    setProducts(data);
  };

  const handleChange = (event) => {
    const [file] = event.target.files;
    Papa.parse(file, {
      complete: handleComplete
    });
  };

  return (
    <Button component="label">
      Імпорт
      <input
        style={{ display: "none" }}
        type="file"
        accept=".csv"
        onChange={handleChange}
      />
    </Button>
  );
}

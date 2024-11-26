import { Button } from "@mui/material";
import Papa from "papaparse";

import { getNumberValue } from "utils";

import { useProductsContext } from "../ProductsContext";
import { useMutation } from "@tanstack/react-query";
import * as Q from "queries";

export function CsvImportButton() {
  const { setProducts } = useProductsContext();

  const { mutateAsync } = useMutation({ mutationFn: Q.getProductById });

  const handleComplete = async (results) => {
    const data = [];
    results.data.forEach((el, index) => {
      if (!index) return;
      const [
        id,
        code,
        name,
        purchasePrice,
        margin,
        price,
        is_weight,
        related_barcodes,
      ] = el;
      const initData = {
        id,
        code: Number(code),
        name,
        price: 0,
        is_weight: is_weight === "true",
        related_barcodes,
      };
      data.push({
        ...initData,
        purchasePrice: getNumberValue(purchasePrice),
        margin: getNumberValue(margin),
        price: getNumberValue(price),
        marked: false,
        original: initData,
      });
    });
    for (const el of data) {
      if (el.id) {
        el.original = await mutateAsync(el);
      }
    }
    setProducts(data);
  };

  const handleChange = (event) => {
    const [file] = event.target.files;
    event.target.value = null;
    Papa.parse(file, {
      complete: handleComplete,
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

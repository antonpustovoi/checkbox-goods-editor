import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Papa from "papaparse";

import * as Q from "queries";
import { getNumberValue } from "utils";

import { useProductsContext } from "../ProductsContext";

export function CsvImportButton() {
  const { setProducts } = useProductsContext();

  const { mutateAsync } = useMutation({ mutationFn: Q.getProductById });

  const handleComplete = async (results) => {
    const data = [];
    for (const el of results.data) {
      if (results.data[0] === el) continue;
      const [
        id,
        code,
        name,
        purchasePrice,
        quantity,
        margin,
        price,
        is_weight,
        related_barcodes,
      ] = el;
      const initData = {
        code: Number(code),
        name,
        price: 0,
        is_weight: is_weight === "true",
        related_barcodes,
      };
      data.push({
        ...initData,
        purchasePrice: getNumberValue(purchasePrice),
        quantity: getNumberValue(quantity),
        margin: getNumberValue(margin),
        price: getNumberValue(price),
        marked: false,
        original: id ? await mutateAsync({ id }) : initData,
      });
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

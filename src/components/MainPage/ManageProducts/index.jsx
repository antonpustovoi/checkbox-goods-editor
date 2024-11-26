import { useState } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid2 as Grid,
  Switch,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";

import { useImmer } from "hooks/useImmer";
import * as Q from "queries";
import { exportToCsvFile } from "utils";

import { AddProductButton } from "./AddProductButton";
import { ClearMarkedProductsButton } from "./ClearMarkedProductsButton";
import { CsvExportButton } from "./CsvExportButton";
import { CsvImportButton } from "./CsvImportButton";
import { ProductsContext } from "./ProductsContext";
import { ProductsTable } from "./ProductsTable";
import { SelectProductField } from "./SelectProductField";
import { css } from "./css";

export function ManageProducts() {
  const [products, setProducts] = useImmer([]);

  const [shouldAutoExport, setShouldAutoExport] = useState(true);

  const handleSuccess = (nextData) => {
    if (shouldAutoExport) {
      exportToCsvFile(products);
    }
    setProducts(nextData);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: Q.saveProducts,
    onSuccess: handleSuccess,
  });

  const handleSave = () => mutate(products);

  const handleChange = () => setShouldAutoExport(!shouldAutoExport);

  const handleProductChange = (value) => setProducts([...products, value]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      <Grid
        container
        direction="column"
        sx={{ height: "100%", position: "relative" }}
      >
        {isPending && (
          <div css={css.frame}>
            <CircularProgress />
            <span>Збереження змін</span>
          </div>
        )}
        <Grid css={{ padding: "8px 12px" }}>
          <SelectProductField onChange={handleProductChange} />
        </Grid>
        <Divider />
        <Grid container css={{ padding: "8px 12px 4px" }}>
          <FormControlLabel
            css={{ marginRight: "auto" }}
            control={<Switch />}
            label="Експортувати при збереженні"
            checked={shouldAutoExport}
            onChange={handleChange}
          />
          <CsvExportButton />
          <CsvImportButton />
          <ClearMarkedProductsButton />
          <AddProductButton />
          <Button disabled={!products.length || isPending} onClick={handleSave}>
            Зберегти зміни
          </Button>
        </Grid>
        {products.every(
          (product) =>
            product.original.id &&
            ["code", "name", "price", "is_weight", "related_barcodes"].every(
              (field) => product[field] === product.original[field]
            )
        ) && (
          <Grid
            container
            justifyContent="flex-end"
            alignItems="center"
            sx={{ padding: "8px  20px", color: "#707070" }}
          >
            <CheckCircleIcon
              sx={{ marginRight: "8px", color: "success.main" }}
            />
            Всі продукти синхронізовані
          </Grid>
        )}
        <Grid size="grow" sx={{ overflow: "auto", width: "100%" }}>
          <ProductsTable />
        </Grid>
      </Grid>
    </ProductsContext.Provider>
  );
}

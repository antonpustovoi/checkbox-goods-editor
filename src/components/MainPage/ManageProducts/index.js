import { useState } from "react";

import {
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  Unstable_Grid2 as Grid,
  Switch
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { useImmer } from "@hooks/useImmer";
import * as Q from "@queries";
import { exportToCsvFile } from "@utils";

import { AddProductButton } from "./AddProductButton";
import { ClearMarkedProductsButton } from "./ClearMarkedProductsButton";
import { CsvExportButton } from "./CsvExportButton";
import { CsvImportButton } from "./CsvImportButton";
import { ProductsContext } from "./ProductsContext";
import { ProductsTable } from "./ProductsTable";
import { SelectProductField } from "./SelectProductField";
import { css } from "./css";

export function ManageProducts() {
  const { enqueueSnackbar } = useSnackbar();

  const [products, setProducts] = useImmer([]);

  const [shouldAutoExport, setShouldAutoExport] = useState(true);

  const handleSuccess = (nextData) => {
    if (shouldAutoExport) {
      exportToCsvFile(products);
    }
    setProducts(nextData);
  };

  const handleError = (error) =>
    enqueueSnackbar(error.message, {
      variant: "error",
      autoHideDuration: 5000
    });

  const { mutate, isPending } = useMutation({
    mutationFn: Q.saveProducts,
    onSuccess: handleSuccess,
    onError: handleError
  });

  const handleSave = () => mutate(products);

  const handleChange = () => setShouldAutoExport(!shouldAutoExport);

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
          <SelectProductField />
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
        <Grid xs sx={{ overflow: "auto", width: "100%" }}>
          <ProductsTable />
        </Grid>
      </Grid>
    </ProductsContext.Provider>
  );
}

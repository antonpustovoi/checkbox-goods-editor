import { useState } from "react";

import {
  Button,
  CircularProgress,
  FormControlLabel,
  Unstable_Grid2 as Grid,
  Switch
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { useImmer } from "../../../hooks/useImmer";
import * as Q from "../../../queries";

import { AddProductButton } from "./AddProductButton";
import { ClearMarkedProductsButton } from "./ClearMarkedProductsButton";
import { CsvExportButton } from "./CsvExportButton";
import { CsvImportButton } from "./CsvImportButton";
import { GoodsContext } from "./GoodsContext";
import { GoodsTable } from "./GoodsTable";
import { SelectProductField } from "./SelectProductField";

export function ManageGoods() {
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useImmer([]);

  const [shouldAutoExport, setShouldAutoExport] = useState(true);

  const { mutate, isPending } = useMutation({
    mutationFn: Q.saveGoods,
    onError: (error) =>
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 5000
      })
  });

  const handleSave = () => mutate(data);

  const handleSwitch = () => setShouldAutoExport(!shouldAutoExport);

  return (
    <GoodsContext.Provider value={{ data, setData }}>
      <Grid
        container
        direction="column"
        sx={{ height: "100%", position: "relative" }}
      >
        {isPending && (
          <div
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: "2",
              backgroundColor: "#FFFFFFB0"
            }}
          >
            <CircularProgress />
            <span style={{ marginLeft: "10px" }}>Збереження змін</span>
          </div>
        )}
        <Grid>
          <SelectProductField />
        </Grid>
        <Grid sx={{ marginLeft: "auto" }}>
          <FormControlLabel
            control={<Switch />}
            label="Експортувати при збереженні"
            value={shouldAutoExport}
            onChange={handleSwitch}
          />
          <CsvExportButton />
          <CsvImportButton />
          <ClearMarkedProductsButton />
          <AddProductButton />
          <Button disabled={!data.length || isPending} onClick={handleSave}>
            Зберегти зміни
          </Button>
        </Grid>
        <Grid xs sx={{ overflow: "auto", width: "100%" }}>
          <GoodsTable />
        </Grid>
      </Grid>
    </GoodsContext.Provider>
  );
}

import { useState } from "react";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Unstable_Grid2 as Grid,
  IconButton,
  OutlinedInput,
  TextField
} from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";

import { AddBarcodeField } from "./AddBarcodeField";

export function BarcodeEditableCell(props) {
  const { api, value, id, field, hasFocus, row } = props;

  const apiRef = useGridApiContext();

  const initBarcodes = value ? value.split(",").map((el) => el.trim()) : [];

  const [barcodes, setBarcodes] = useState(initBarcodes);

  const handleClose = () => api.stopCellEditMode({ id, field });

  const handleSave = () => {
    apiRef.current.setEditCellValue({ id, field, value: barcodes.join(",") });
    api.stopCellEditMode({ id, field });
  };

  const handleAdd = (value) => setBarcodes([...barcodes, value]);

  const renderBarcodeField = (value) => {
    const handleRemove = () =>
      setBarcodes(barcodes.filter((barcode) => barcode !== value));

    return (
      <Grid key={value} xs={12} sx={{ display: "flex", alignItems: "center" }}>
        <OutlinedInput fullWidth value={value} disabled />
        <IconButton onClick={handleRemove}>
          <CloseOutlinedIcon />
        </IconButton>
      </Grid>
    );
  };

  return (
    <>
      <span
        css={{ padding: "0 8px", overflow: "hidden", textOverflow: "ellipsis" }}
      >
        {value}
      </span>
      <Dialog open fullWidth>
        <DialogTitle>Редагування штрих-кодів</DialogTitle>
        <DialogContent style={{ paddingTop: "12px" }}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <TextField
                fullWidth
                label="Назва товару"
                value={row.name}
                disabled
              />
            </Grid>
            {barcodes.map(renderBarcodeField)}
            <Grid xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <AddBarcodeField row={row} values={barcodes} onAdd={handleAdd} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрити</Button>
          <Button onClick={handleSave}>Зберегти</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

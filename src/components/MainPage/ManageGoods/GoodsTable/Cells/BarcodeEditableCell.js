import { useState } from "react";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
  Button,
  CircularProgress,
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
import { useQuery } from "@tanstack/react-query";

import { useDebounce } from "../../../../../hooks/useDebounce";
import * as Q from "../../../../../queries";

export function BarcodeEditableCell(props) {
  const { api, value, id, field, hasFocus, row } = props;
  const apiRef = useGridApiContext();

  const [newBarcode, setNewBarcode] = useState("");

  const [debounceValue, setDebounceValue] = useState("");

  const [barcodes, setBarcodes] = useState(
    value.split(",").map((el) => el.trim())
  );

  const { data, isFetching } = useQuery({
    queryKey: ["Goods", debounceValue],
    queryFn: Q.getGoods,
    initialData: []
  });

  const debounceSetNewBarcode = useDebounce(setDebounceValue, 200);

  console.log("XXXXX", props, apiRef);

  const handleAdd = () => {
    setBarcodes((barcodes) => [...barcodes, newBarcode]);
    setNewBarcode("");
  };

  const handleClose = () => api.stopCellEditMode({ id, field });

  const handleSave = () => {
    //apiRef.current.setEditCellValue({ id, field, value: newValue });
    api.stopCellEditMode({ id, field });
  };

  const handleRemove = (value) => () =>
    setBarcodes((barcodes) => barcodes.filter((barcode) => barcode !== value));

  const handleChange = (event) => {
    const { value } = event.target;
    setNewBarcode(value);
    debounceSetNewBarcode(value);
  };

  return (
    <>
      <span
        style={{
          padding: "0 8px",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
      >
        {value}
      </span>
      <Dialog open fullWidth>
        <DialogTitle>Редагування штрих-кодів</DialogTitle>
        <DialogContent style={{ paddingTop: "12px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Назва товару"
                value={row.name}
                disabled
              />
            </Grid>
            {barcodes.map((barcode) => (
              <Grid
                key={barcode}
                item
                xs={12}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <OutlinedInput fullWidth value={barcode} disabled />
                <IconButton onClick={handleRemove(barcode)}>
                  <CloseOutlinedIcon />
                </IconButton>
              </Grid>
            ))}
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <OutlinedInput
                value={newBarcode}
                fullWidth
                placeholder="Введіть штрих-код"
                onChange={handleChange}
                endAdornment={
                  <>
                    {isFetching && (
                      <CircularProgress color="inherit" size={20} />
                    )}
                    {Boolean(data.length) && <ErrorOutlineOutlinedIcon />}
                    {!data.length && <CheckCircleOutlineOutlinedIcon />}
                  </>
                }
              />
              <IconButton onClick={handleAdd}>
                <SaveOutlinedIcon />
              </IconButton>
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

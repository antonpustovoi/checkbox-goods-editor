import { useEffect, useRef, useState } from "react";

import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import * as Q from "queries";

import { useProductsContext } from "../../ProductsContext";

AddBarcodeDialogContent.propTypes = {
  currentRow: PropTypes.object,
  onClose: PropTypes.func,
};

export function AddBarcodeDialogContent(props) {
  const { currentRow, onClose } = props;

  const { products, updateProduct } = useProductsContext();

  const { enqueueSnackbar } = useSnackbar();

  const inputRef = useRef();

  const [inputValue, setInputValue] = useState("");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: Q.getProduct,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleInputChange = (event) => setInputValue(event.target.value);

  const handleSave = async () => {
    const data = await mutateAsync({ queryKey: [null, inputValue] });
    const isBarcodeExist = Boolean(
      products.some((product) =>
        product.related_barcodes.split(",").includes(inputValue),
      ) ||
        (data && products.every((product) => product.code !== data.code)),
    );
    if (isBarcodeExist) {
      enqueueSnackbar("Штрих-код вже існує", {
        variant: "error",
        autoHideDuration: 5000,
      });
      inputRef.current.select();
    } else {
      updateProduct(currentRow.code, (product) => {
        product.related_barcodes = product.related_barcodes
          ? product.related_barcodes.concat(`,${inputValue}`)
          : inputValue;
      });
      enqueueSnackbar("Штрих-код був доданий успішно", {
        variant: "success",
        autoHideDuration: 5000,
      });
      onClose();
    }
  };

  return (
    <>
      <DialogTitle>Додати штрих-код</DialogTitle>
      <DialogContent style={{ paddingTop: "12px" }}>
        <TextField
          fullWidth
          inputRef={inputRef}
          label="Штрих-код"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(event) => event.key === "Enter" && handleSave()}
        />
      </DialogContent>
      <DialogActions>
        {isPending && <CircularProgress size={20} />}
        <Button onClick={onClose}>Закрити</Button>
        <Button disabled={isPending} onClick={handleSave}>
          Зберегти
        </Button>
      </DialogActions>
    </>
  );
}

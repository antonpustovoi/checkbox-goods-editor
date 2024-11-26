import { useState } from "react";

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";

import { useProductsContext } from "components/MainPage/ManageProducts/ProductsContext";
import { SelectProductField } from "components/MainPage/ManageProducts/SelectProductField";

ChangeProductDialogContent.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func,
};

export function ChangeProductDialogContent(props) {
  const { data, onClose } = props;

  const { getIndex, setProduct } = useProductsContext();

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSave = () => setProduct(getIndex(data.code), selectedProduct);

  return (
    <>
      <DialogTitle>Змінити продукт</DialogTitle>
      <DialogContent style={{ paddingTop: "12px" }}>
        <SelectProductField
          value={selectedProduct}
          onChange={setSelectedProduct}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрити</Button>
        <Button disabled={!selectedProduct} onClick={handleSave}>
          Зберегти
        </Button>
      </DialogActions>
    </>
  );
}

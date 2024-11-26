import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useProductsContext } from "components/MainPage/ManageProducts/ProductsContext";
import PropTypes from "prop-types";

import * as Q from "queries/index";

RemoveFromDatabaseDialogContent.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func,
};

export function RemoveFromDatabaseDialogContent(props) {
  const { data, onClose } = props;

  const { filterProducts } = useProductsContext();

  const handleSuccess = () => {
    filterProducts((product) => product.code !== data.code);
    onClose();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: Q.deleteProduct,
    onSuccess: handleSuccess,
  });

  const handleRemove = () => mutate(data);

  return (
    <>
      <DialogTitle>Видалення продукту</DialogTitle>
      <DialogContent>
        Ви впевнені, що бажаєте видалити продукт:{" "}
        <span style={{ fontWeight: "bold" }}>{data.name}</span> ?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Скасувати</Button>
        <Button disabled={isPending} onClick={handleRemove}>
          Видалити
        </Button>
      </DialogActions>
    </>
  );
}

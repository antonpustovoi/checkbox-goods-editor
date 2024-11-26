import SyncIcon from "@mui/icons-material/Sync";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";

import * as Q from "queries/index";

import { useProductsContext } from "../../ProductsContext";

import { MenuItem } from "./MenuItem";

SyncProductMenuItem.propTypes = {
  row: PropTypes.object,
};

export function SyncProductMenuItem(props) {
  const { row } = props;

  const { updateProduct } = useProductsContext();

  const handleSuccess = (data) =>
    updateProduct(data.code, (product) => {
      product.original = data;
    });

  const { mutate, isPending } = useMutation({
    mutationFn: Q.getProductById,
    onSuccess: handleSuccess,
  });

  const isDisabled = Boolean(isPending || !row.original.id);

  const handleClick = () => mutate(row);

  return (
    <MenuItem icon={<SyncIcon />} disabled={isDisabled} onClick={handleClick}>
      Синхронізувати
    </MenuItem>
  );
}

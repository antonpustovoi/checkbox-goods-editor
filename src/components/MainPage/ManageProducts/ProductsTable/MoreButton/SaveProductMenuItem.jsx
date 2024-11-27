import SaveIcon from "@mui/icons-material/SaveOutlined";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";

import * as Q from "queries/index";

import { useProductsContext } from "../../ProductsContext";

import { MenuItem } from "./MenuItem";

SaveProductMenuItem.propTypes = {
  row: PropTypes.object,
};

export function SaveProductMenuItem(props) {
  const { row } = props;

  const { updateProduct } = useProductsContext();

  const handleSuccess = (data) =>
    updateProduct(data.code, (product) => {
      product.original = data;
    });

  const { mutate, isPending } = useMutation({
    mutationFn: Q.saveProduct,
    onSuccess: handleSuccess,
  });

  const isDisabled = Boolean(
    isPending ||
      ["code", "name", "price", "is_weight", "related_barcodes"].every(
        (field) => row[field] === row.original[field],
      ),
  );

  const handleClick = () => mutate({ ...row, id: row.original.id });

  return (
    <MenuItem icon={<SaveIcon />} disabled={isDisabled} onClick={handleClick}>
      Зберегти зміни
    </MenuItem>
  );
}

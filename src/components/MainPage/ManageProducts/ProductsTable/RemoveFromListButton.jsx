import RemoveIcon from "@mui/icons-material/CloseOutlined";
import { IconButton } from "@mui/material";
import PropTypes from "prop-types";

import { useProductsContext } from "../ProductsContext";

RemoveFromListButton.propTypes = {
  row: PropTypes.object,
  api: PropTypes.object,
};

export function RemoveFromListButton(props) {
  const { row, api } = props;

  const { filterProducts } = useProductsContext();

  const handleClick = () => {
    filterProducts((product) => product.code !== row.code);
    api.updateRows([{ ...row, _action: "delete" }]);
  };

  return (
    <IconButton onClick={handleClick}>
      <RemoveIcon />
    </IconButton>
  );
}

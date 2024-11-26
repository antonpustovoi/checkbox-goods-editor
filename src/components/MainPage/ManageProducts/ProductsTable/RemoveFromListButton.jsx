import RemoveIcon from "@mui/icons-material/CloseOutlined";
import { IconButton } from "@mui/material";
import PropTypes from "prop-types";

import { useProductsContext } from "../ProductsContext";

RemoveFromListButton.propTypes = {
  row: PropTypes.object,
};

export function RemoveFromListButton(props) {
  const { row } = props;

  const { filterProducts } = useProductsContext();

  const handleClick = () =>
    filterProducts((product) => product.code !== row.code);

  return (
    <IconButton onClick={handleClick}>
      <RemoveIcon />
    </IconButton>
  );
}

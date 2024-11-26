import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import PropTypes from "prop-types";

import { useProductsContext } from "../../ProductsContext";
import { MenuItem } from "./MenuItem";
import { getInitialProduct } from "../../utils";

AddRowMenuItems.propTypes = {
  row: PropTypes.object,
};

export function AddRowMenuItems(props) {
  const { row } = props;

  const { getIndex, addProduct } = useProductsContext();

  const handleClick = (offset) =>
    addProduct(getIndex(row.code) + offset, getInitialProduct());

  return (
    <>
      <MenuItem icon={<ArrowCircleUpIcon />} onClick={() => handleClick(0)}>
        Додати рядок вище
      </MenuItem>
      <MenuItem icon={<ArrowCircleDownIcon />} onClick={() => handleClick(1)}>
        Додати рядок нижче
      </MenuItem>
    </>
  );
}

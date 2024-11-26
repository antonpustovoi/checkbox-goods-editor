import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PropTypes from "prop-types";

import { useProductsContext } from "../../ProductsContext";
import { MenuItem } from "./MenuItem";

MoveRowMenuItems.propTypes = {
  row: PropTypes.object,
};

export function MoveRowMenuItems(props) {
  const { row } = props;

  const { products, swapProducts } = useProductsContext();

  const index = products.findIndex((product) => product.code === row.code);

  const getMenuItemProps = (offset) => ({
    disabled: !products[index + offset],
    onClick: () => swapProducts(index, index + offset),
  });

  return (
    <>
      <MenuItem {...getMenuItemProps(-1)} icon={<ArrowUpwardIcon />}>
        Перемістити вверх
      </MenuItem>
      <MenuItem {...getMenuItemProps(1)} icon={<ArrowDownwardIcon />}>
        Перемістити вниз
      </MenuItem>
    </>
  );
}

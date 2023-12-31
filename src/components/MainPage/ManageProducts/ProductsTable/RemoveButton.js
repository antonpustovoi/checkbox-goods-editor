import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { IconButton } from "@mui/material";
import PropTypes from "prop-types";

import { useProductsContext } from "../ProductsContext";

RemoveButton.propTypes = {
  row: PropTypes.object
};

export function RemoveButton(props) {
  const { row } = props;

  const { products, setProducts } = useProductsContext();

  const handleClick = () => {
    const nextProducts = products.filter(
      (product) => product.code !== row.code
    );
    setProducts(nextProducts);
  };

  return (
    <IconButton onClick={handleClick}>
      <DeleteOutlinedIcon />
    </IconButton>
  );
}

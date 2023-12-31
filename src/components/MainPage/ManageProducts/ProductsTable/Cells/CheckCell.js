import CheckIcon from "@mui/icons-material/Check";
import PropTypes from "prop-types";

import { useProductsContext } from "../../ProductsContext";

CheckCell.propTypes = {
  field: PropTypes.string,
  row: PropTypes.object
};

export function CheckCell(props) {
  const { field, row } = props;

  const { setProducts } = useProductsContext();

  const handleClick = () =>
    setProducts((draftProducts) => {
      const foundProduct = draftProducts.find(
        (product) => product.code === row.code
      );
      foundProduct[field] = !foundProduct[field];
    });

  return (
    <div
      css={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer"
      }}
      onClick={handleClick}
    >
      {Boolean(row[field]) && <CheckIcon />}
    </div>
  );
}

import PropTypes from "prop-types";

import { getPrice } from "../../utils";

MarginCell.propTypes = {
  row: PropTypes.object,
};

export function MarginCell(props) {
  const { purchasePrice, quantity, margin } = props.row;

  return (
    <div
      css={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>{margin}</div>
      {Boolean(purchasePrice && quantity && margin) && (
        <div css={{ color: "#707070" }}>
          ({getPrice(purchasePrice, quantity, margin).toFixed(2)})
        </div>
      )}
    </div>
  );
}

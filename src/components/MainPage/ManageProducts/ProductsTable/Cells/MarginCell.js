import PropTypes from "prop-types";

MarginCell.propTypes = {
  row: PropTypes.object
};

export function MarginCell(props) {
  const { margin, purchasePrice } = props.row;

  return (
    <div
      css={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <div>{margin}</div>
      {Boolean(purchasePrice && margin) && (
        <div css={{ color: "#707070" }}>
          ({Number(purchasePrice * (1 + margin / 100)).toFixed(2)})
        </div>
      )}
    </div>
  );
}

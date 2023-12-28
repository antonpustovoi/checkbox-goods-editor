export function MarginCell(props) {
  const { row } = props;
  const { margin, purchasePrice } = row;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <div>{margin}</div>
      {Boolean(purchasePrice && margin) && (
        <div style={{ color: "#707070" }}>
          ({Number(purchasePrice + purchasePrice * (margin / 100)).toFixed(2)})
        </div>
      )}
    </div>
  );
}

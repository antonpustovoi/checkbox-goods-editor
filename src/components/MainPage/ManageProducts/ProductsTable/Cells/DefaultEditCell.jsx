import { GridEditInputCell } from "@mui/x-data-grid";

export function DefaultEditCell(props) {
  return (
    <GridEditInputCell
      slotProps={{
        input: {
          style: {
            padding: "0 10px",
          },
        },
      }}
      onFocus={(event) => event.target.select()}
      {...props}
    />
  );
}

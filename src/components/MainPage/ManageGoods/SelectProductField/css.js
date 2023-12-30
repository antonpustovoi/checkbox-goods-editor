import { alpha } from "@mui/material";

export const css = {
  option: (theme) => ({
    whiteSpace: "nowrap",
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.light, 0.2)
    }
  }),
  name: {
    marginRight: "auto"
  },
  barcodes: {
    margin: "0 20px",
    color: "#707070",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  price: {
    color: "#707070",
    minWidth: "60px"
  }
};

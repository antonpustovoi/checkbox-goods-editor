import { DataGrid } from "@mui/x-data-grid";

import { isNullable } from "../../../../utils";
import { useProductsContext } from "../ProductsContext";

import { columns } from "./columns";

export function ProductsTable() {
  const { products, setProducts } = useProductsContext();

  const processRowUpdate = (newRow, _originalRow) => {
    setProducts((draftProducts) => {
      const productIndex = draftProducts.findIndex(
        (product) => product.code === newRow.code
      );
      draftProducts[productIndex] = newRow;
    });
    return newRow;
  };

  return (
    <DataGrid
      rows={products}
      columns={columns}
      hideFooter
      disableColumnMenu
      processRowUpdate={processRowUpdate}
      localeText={{
        noRowsLabel: "Список порожній"
      }}
      sort
      getRowId={(row) => row.code}
      getCellClassName={(params) => {
        const { field, row } = params;
        const originalValue = row.original[field];
        const value = row[field];

        const isValueChanged = Boolean(
          ["name", "price", "is_weight", "related_barcodes"].includes(field) &&
            !isNullable(originalValue) &&
            !isNullable(value) &&
            originalValue !== value
        );
        if (isValueChanged) {
          return "cell-changed";
        }
      }}
      sx={{
        "& .cell-changed": {
          backgroundColor: "#B7EDFF"
        },
        "& .MuiInputBase-root > input": {
          padding: "0 10px"
        }
      }}
    />
  );
}

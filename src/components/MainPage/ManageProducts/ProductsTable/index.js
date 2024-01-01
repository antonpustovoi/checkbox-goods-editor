import { DataGrid } from "@mui/x-data-grid";

import { useProductsContext } from "../ProductsContext";

import { columns } from "./columns";

export function ProductsTable() {
  const { products, setProducts } = useProductsContext();

  const processRowUpdate = (newRow) => {
    setProducts((draftProducts) => {
      const productIndex = draftProducts.findIndex(
        (product) => product.code === newRow.code
      );
      draftProducts[productIndex] = newRow;
    });
    return newRow;
  };

  const getCellClassName = ({ field, row }) =>
    ["name", "price", "is_weight", "related_barcodes"].includes(field) &&
    row.original[field] !== row[field]
      ? "changed-cell"
      : "";

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
      getRowId={(row) => row.code}
      getCellClassName={getCellClassName}
      sx={{
        "& .changed-cell": {
          backgroundColor: "#B7EDFF"
        }
      }}
    />
  );
}

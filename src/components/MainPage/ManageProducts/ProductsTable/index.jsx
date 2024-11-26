import { DataGrid } from "@mui/x-data-grid";

import { useProductsContext } from "../ProductsContext";

import { columns } from "./columns";

export function ProductsTable() {
  const { products, getIndex, setProduct } = useProductsContext();

  const processRowUpdate = (newRow) => {
    setProduct(getIndex(newRow.code), newRow);
    return newRow;
  };

  const getRowClassName = ({ row }) =>
    row.original.id &&
    ["code", "name", "price", "is_weight", "related_barcodes"].every(
      (field) => row[field] === row.original[field],
    )
      ? "saved-data"
      : "";

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
        noRowsLabel: "Список порожній",
      }}
      getRowId={(row) => row.code}
      getRowClassName={getRowClassName}
      getCellClassName={getCellClassName}
      sx={{
        "& .saved-data": {
          backgroundColor: "#00FF0050 !important",
          ":hover": {
            backgroundColor: "#00FF0070 !important",
          },
        },
        "& .changed-cell": {
          backgroundColor: "#B7EDFF",
        },
      }}
    />
  );
}

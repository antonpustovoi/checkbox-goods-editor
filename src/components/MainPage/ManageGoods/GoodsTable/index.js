import { DataGrid } from "@mui/x-data-grid";

import { isNullable } from "../../../../utils";
import { useGoodsContext } from "../GoodsContext";

import { columns } from "./columns";

export function GoodsTable() {
  const { data, setData } = useGoodsContext();

  const processRowUpdate = (newRow, _originalRow) => {
    setData((draftData) => {
      const draftRowIndex = draftData.findIndex(
        (el) => el.code === newRow.code
      );
      draftData[draftRowIndex] = newRow;
    });
    return newRow;
  };

  return (
    <DataGrid
      rows={data}
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

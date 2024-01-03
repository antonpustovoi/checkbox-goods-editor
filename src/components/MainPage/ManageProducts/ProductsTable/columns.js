import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import { getNumberValue } from "@utils";

import { BarcodesEditCell } from "./Cells/BarcodesEditCell";
import { CheckCell } from "./Cells/CheckCell";
import { DefaultCell } from "./Cells/DefaultCell";
import { DefaultEditCell } from "./Cells/DefaultEditCell";
import { MarginCell } from "./Cells/MarginCell";
import { PriceCell } from "./Cells/PriceCell";
import { RemoveButton } from "./RemoveButton";

const getPrice = (purchasePrice, margin) =>
  getNumberValue(
    getNumberValue(purchasePrice) * (1 + getNumberValue(margin) / 100)
  );

export const columns = [
  {
    headerName: "Код",
    field: "code",
    width: 130
  },
  {
    headerName: "Назва",
    field: "name",
    flex: 1,
    editable: true,
    renderCell: (params) => <DefaultCell {...params} />,
    renderEditCell: (params) => <DefaultEditCell {...params} />
  },
  {
    headerName: "Ціна закупки",
    field: "purchasePrice",
    width: 104,
    editable: true,
    type: "number",
    valueSetter: ({ value, row }) => ({
      ...row,
      purchasePrice: getNumberValue(value),
      price: getPrice(value, row.margin)
    }),
    renderCell: ({ value }) => (value ? Number(value).toFixed(2) : "-"),
    renderEditCell: (params) => <DefaultEditCell {...params} />
  },
  {
    headerName: "Націнка (%)",
    field: "margin",
    width: 100,
    editable: true,
    type: "number",
    valueSetter: ({ value, row }) => ({
      ...row,
      margin: getNumberValue(value),
      price: getPrice(row.purchasePrice, value)
    }),
    renderCell: (params) => <MarginCell {...params} />,
    renderEditCell: (params) => <DefaultEditCell {...params} />
  },
  {
    headerName: "Нова Ціна",
    field: "price",
    width: 114,
    editable: true,
    type: "number",
    valueSetter: ({ value, row }) => ({
      ...row,
      price: getNumberValue(value)
    }),
    renderCell: (params) => <PriceCell {...params} />,
    renderEditCell: (params) => <DefaultEditCell {...params} />
  },
  {
    headerName: "Поточна Ціна",
    field: "originalPrice",
    width: 110,
    renderCell: ({ row }) =>
      row.original.price ? Number(row.original.price).toFixed(2) : "-"
  },
  {
    headerName: "Ваговий",
    field: "is_weight",
    width: 74,
    renderCell: (params) => <CheckCell {...params} />
  },
  {
    headerName: "Маркований",
    field: "marked",
    width: 102,
    renderCell: (params) => <CheckCell {...params} />
  },
  {
    headerName: "Штрих-коди",
    field: "related_barcodes",
    width: 100,
    editable: true,
    renderCell: (params) => <DefaultCell {...params} />,
    renderEditCell: (params) => <BarcodesEditCell {...params} />
  },
  {
    headerName: "Збережено",
    field: "saved",
    width: 96,
    align: "center",
    renderCell: ({ row }) =>
      Boolean(
        row.original.id &&
          ["code", "name", "price", "is_weight", "related_barcodes"].every(
            (field) => row[field] === row.original[field]
          )
      ) && <CheckCircleOutlineOutlinedIcon sx={{ color: "success.main" }} />
  },
  {
    headerName: "Дії",
    field: "actions",
    width: 60,
    headerAlign: "center",
    renderCell: (params) => <RemoveButton {...params} />
  }
];

columns.forEach((column) => {
  column.sortable ??= false;
  column.headerAlign ??= "left";
  column.align ??= "left";
});

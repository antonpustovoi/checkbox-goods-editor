import { getNumberValue } from "utils";

import { getPrice } from "../utils";

import { AddBarcodeButton } from "./AddBarcodeButton";
import { BarcodesEditCell } from "./Cells/BarcodesEditCell";
import { CheckCell } from "./Cells/CheckCell";
import { DefaultCell } from "./Cells/DefaultCell";
import { DefaultEditCell } from "./Cells/DefaultEditCell";
import { MarginCell } from "./Cells/MarginCell";
import { PriceCell } from "./Cells/PriceCell";
import { MoreButton } from "./MoreButton";
import { RemoveFromListButton } from "./RemoveFromListButton";

export const columns = [
  {
    headerName: "Код",
    field: "code",
    width: 124,
  },
  {
    headerName: "Назва",
    field: "name",
    flex: 1,
    editable: true,
    valueSetter: (value, row) => ({ ...row, name: value.trim() }),
    renderCell: (params) => <DefaultCell {...params} />,
    renderEditCell: (params) => <DefaultEditCell {...params} />,
  },
  {
    headerName: "Ціна закупки",
    field: "purchasePrice",
    width: 104,
    editable: true,
    type: "number",
    valueSetter: (value, row) => ({
      ...row,
      purchasePrice: getNumberValue(value),
      price: getPrice(value, row.quantity, row.margin),
    }),
    renderCell: ({ value }) => (value ? Number(value).toFixed(2) : "-"),
    renderEditCell: (params) => <DefaultEditCell {...params} />,
  },
  {
    headerName: "Кількість",
    field: "quantity",
    width: 80,
    editable: true,
    type: "number",
    valueSetter: (value, row) => ({
      ...row,
      quantity: getNumberValue(value),
      price: getPrice(row.purchasePrice, value, row.margin),
    }),
    renderCell: ({ value }) => (value ? Number(value).toFixed(2) : "-"),
    renderEditCell: (params) => <DefaultEditCell {...params} />,
  },
  {
    headerName: "Націнка (%)",
    field: "margin",
    width: 100,
    editable: true,
    type: "number",
    valueSetter: (value, row) => ({
      ...row,
      margin: getNumberValue(value),
      price: getPrice(row.purchasePrice, row.quantity, value),
    }),
    renderCell: (params) => <MarginCell {...params} />,
    renderEditCell: (params) => <DefaultEditCell {...params} />,
  },
  {
    headerName: "Нова Ціна",
    field: "price",
    width: 114,
    editable: true,
    type: "number",
    valueSetter: (value, row) => ({
      ...row,
      price: getNumberValue(value),
    }),
    renderCell: (params) => <PriceCell {...params} />,
    renderEditCell: (params) => <DefaultEditCell {...params} />,
  },
  {
    headerName: "Поточна Ціна",
    field: "originalPrice",
    width: 110,
    renderCell: ({ row }) =>
      row.original.price ? Number(row.original.price).toFixed(2) : "-",
  },
  {
    headerName: "Ваговий",
    field: "is_weight",
    width: 74,
    renderCell: (params) => <CheckCell {...params} />,
  },
  {
    headerName: "Маркований",
    field: "marked",
    width: 102,
    renderCell: (params) => <CheckCell {...params} />,
    renderEditCell: (params) => <BarcodesEditCell {...params} />,
  },
  {
    headerName: "Штрих-коди",
    field: "related_barcodes",
    width: 100,
    editable: true,
    renderCell: (params) => <DefaultCell {...params} />,
    renderEditCell: (params) => <BarcodesEditCell {...params} />,
  },
  {
    headerName: "Дата оновлення",
    field: "updated_at",
    width: 156,
    renderCell: ({ row }) => {
      const { updated_at } = row.original;
      return Boolean(updated_at) && new Date(updated_at).toLocaleString();
    },
  },
  {
    headerName: "Дії",
    field: "actions",
    width: 140,
    headerAlign: "center",
    renderCell: (params) => (
      <>
        <AddBarcodeButton {...params} />
        <RemoveFromListButton {...params} />
        <MoreButton {...params} />
      </>
    ),
  },
];

columns.forEach((column) => {
  column.sortable ??= false;
  column.headerAlign ??= "left";
  column.align ??= "left";
  column.resizable ??= false;
});

import { BarcodeEditableCell } from "./Cells/BarcodeEditableCell";
import { CheckCell } from "./Cells/CheckCell";
import { DefaultCell } from "./Cells/DefaultCell";
import { MarginCell } from "./Cells/MarginCell";
import { PriceCell } from "./Cells/PriceCell";
import { RemoveButton } from "./RemoveButton";

export const columns = [
  {
    headerName: "Код",
    field: "code",
    width: 140
  },
  {
    headerName: "Назва",
    field: "name",
    flex: 1,
    editable: true,
    renderCell: (props) => <DefaultCell {...props} />
  },
  {
    headerName: "Ціна закупки",
    field: "purchasePrice",
    editable: true,
    type: "number",
    renderCell: ({ value }) => (value ? Number(value).toFixed(2) : ""),
    valueSetter: ({ value, row }) => ({
      ...row,
      purchasePrice: value,
      price: value && row.margin ? value + value * (row.margin / 100) : null
    })
  },
  {
    headerName: "Націнка (%)",
    field: "margin",
    editable: true,
    type: "number",
    valueSetter: ({ value, row }) => ({
      ...row,
      margin: value,
      price:
        value && row.purchasePrice
          ? row.purchasePrice + row.purchasePrice * (value / 100)
          : null
    }),
    renderCell: (props) => <MarginCell {...props} />
  },
  {
    headerName: "Нова Ціна",
    field: "price",
    editable: true,
    type: "number",
    renderCell: (props) => <PriceCell {...props} />
  },
  {
    headerName: "Поточна Ціна",
    field: "originalPrice",
    type: "number",
    width: 110,
    renderCell: ({ row }) =>
      row.original.price ? Number(row.original.price).toFixed(2) : "-"
  },
  {
    headerName: "Ваговий",
    field: "is_weight",
    width: 74,
    renderCell: (props) => <CheckCell {...props} />
  },
  {
    headerName: "Маркований",
    field: "marked",
    width: 102,
    renderCell: (props) => <CheckCell {...props} />
  },
  {
    headerName: "Штрих-коди",
    field: "related_barcodes",
    editable: true,
    renderCell: (props) => <DefaultCell {...props} />,
    renderEditCell: (props) => <BarcodeEditableCell {...props} />
  },
  {
    headerName: "Дії",
    field: "actions",
    headerAlign: "center",
    width: 60,
    renderCell: (props) => <RemoveButton {...props} />
  }
];

columns.forEach((column) => {
  column.sortable ??= false;
  column.headerAlign ??= "left";
  column.align ??= "left";
});

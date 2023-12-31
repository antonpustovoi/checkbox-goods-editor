import Papa from "papaparse";

export const isNullable = (value) => value === null || value === undefined;

export const downloadFile = (data, filename) => {
  const link = document.createElement("a");
  link.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(data)
  );
  link.setAttribute("download", filename);
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToCsvFile = (data) => {
  const csv = Papa.unparse({
    fields: [
      "Код",
      "Назва продукту",
      "Ціна закупки",
      "Націнка",
      "Ціна",
      "Ваговий",
      "Штрихкоди"
    ],
    data: data.map((el) => [
      el.code,
      el.name,
      el.purchasePrice,
      el.margin,
      el.price,
      el.is_weight,
      el.related_barcodes
    ])
  });
  const filename = `products_${new Date()
    .toLocaleString()
    .replace(", ", "_")}.csv`;
  downloadFile(csv, filename);
};

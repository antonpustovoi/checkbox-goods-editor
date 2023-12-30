import { Button } from "@mui/material";

import { exportToCsvFile } from "@utils";

import { useGoodsContext } from "../GoodsContext";

export function CsvExportButton() {
  const { data } = useGoodsContext();

  const handleClick = () => exportToCsvFile(data);

  return (
    <Button disabled={!data.length} onClick={handleClick}>
      Експорт
    </Button>
  );
}

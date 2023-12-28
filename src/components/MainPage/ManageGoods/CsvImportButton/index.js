import { Button } from "@mui/material";

import { useGoodsContext } from "../GoodsContext";

export function CsvImportButton() {
  const { data } = useGoodsContext();

  const handleClick = () => {
    console.log("XXXX", data);
  };

  return <Button onClick={handleClick}>Імпорт</Button>;
}

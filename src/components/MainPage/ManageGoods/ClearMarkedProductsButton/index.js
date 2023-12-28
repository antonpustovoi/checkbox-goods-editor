import { Button } from "@mui/material";
import { useGoodsContext } from "../GoodsContext";

export function ClearMarkedProductsButton() {
  const { data, setData } = useGoodsContext();

  const isDisabled = data.every((el) => !el.marked);

  const handleClick = () =>
    setData((draftData) => draftData.filter((el) => !el.marked));

  return (
    <Button disabled={isDisabled} onClick={handleClick}>
      Очистити маркованні товари
    </Button>
  );
}

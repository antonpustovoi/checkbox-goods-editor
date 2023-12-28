import { Button } from "@mui/material";
import { useGoodsContext } from "../GoodsContext";

export function AddProductButton() {
  const { setData } = useGoodsContext();

  const handleClick = () =>
    setData((draftData) => {
      const initData = {
        code: Date.now(),
        name: "",
        price: null,
        is_weight: false,
        related_barcodes: "",
      };
      const initialValues = {
        ...initData,
        purchasePrice: null,
        margin: 25,
        marked: false,
        original: initData,
      };
      draftData.push(initialValues);
    });

  return <Button onClick={handleClick}>Додати новий продукт</Button>;
}

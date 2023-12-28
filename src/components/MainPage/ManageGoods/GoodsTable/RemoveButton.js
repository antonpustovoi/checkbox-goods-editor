import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { IconButton } from "@mui/material";
import { useGoodsContext } from "../GoodsContext";

export function RemoveButton(props) {
  const { row } = props;

  const { data, setData } = useGoodsContext();

  const handleClick = () => {
    const nextData = data.filter((el) => el.code !== row.code);
    setData(nextData);
  };

  return (
    <IconButton onClick={handleClick}>
      <DeleteOutlinedIcon />
    </IconButton>
  );
}

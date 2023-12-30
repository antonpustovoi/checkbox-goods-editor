import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { IconButton } from "@mui/material";
import PropTypes from "prop-types";

import { useGoodsContext } from "../GoodsContext";

RemoveButton.propTypes = {
  row: PropTypes.object
};

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

import CheckIcon from "@mui/icons-material/Check";

import { useGoodsContext } from "../../GoodsContext";

export function CheckCell(props) {
  const { field, row } = props;

  const { setData } = useGoodsContext();

  const handleClick = () =>
    setData((draftData) => {
      const foundEl = draftData.find((el) => el.code === row.code);
      foundEl[field] = !foundEl[field];
    });

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer"
      }}
      onClick={handleClick}
    >
      {Boolean(row[field]) && <CheckIcon />}
    </div>
  );
}

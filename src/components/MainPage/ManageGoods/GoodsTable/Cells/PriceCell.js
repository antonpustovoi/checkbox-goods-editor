import ArrowDownward from "@mui/icons-material/ArrowDownward";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import { IconButton } from "@mui/material";
import { useGoodsContext } from "../../GoodsContext";

export function PriceCell(props) {
  const { code, price, original } = props.row;

  const { setData } = useGoodsContext();

  const handleCeilClick = (e) =>
    setData((draftData) => {
      console.log("AAAAAAAAA", e);
      const foundEl = draftData.find((el) => el.code === code);
      foundEl.price = Math.ceil(price);
    });

  const handleFiftyClick = () =>
    setData((draftData) => {
      const foundEl = draftData.find((el) => el.code === code);
      foundEl.price = Math.trunc(price) + 0.5;
    });

  const handleFloorClick = () =>
    setData((draftData) => {
      const foundEl = draftData.find((el) => el.code === code);
      foundEl.price = Math.floor(price);
    });

  return (
    <div
      onKeyDown={(event) => event.preventDefault()}
      style={{ display: "flex", alignItems: "center", width: "100%" }}
    >
      {price ? Number(price).toFixed(2) : "-"}
      {Boolean(original.price && price && price > original.price) && (
        <ArrowUpward sx={{ color: "#FF0000" }} />
      )}
      {Boolean(original.price && price && price < original.price) && (
        <ArrowDownward sx={{ color: "#00FF00" }} />
      )}
      {Boolean(price) && (
        <div
          onDoubleClick={(event) => event.stopPropagation()}
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "auto",
          }}
        >
          <IconButton
            tabIndex={-1}
            sx={{ padding: "2px" }}
            onClick={handleCeilClick}
          >
            <ArrowUpward sx={{ height: "14px", width: "14px" }} />
          </IconButton>
          <IconButton
            tabIndex={-1}
            sx={{ padding: "2px" }}
            onClick={handleFiftyClick}
          >
            <span style={{ fontSize: "12px", fontWeight: "bold" }}>50</span>
          </IconButton>
          <IconButton
            tabIndex={-1}
            sx={{ padding: "2px" }}
            onClick={handleFloorClick}
          >
            <ArrowDownward sx={{ height: "14px", width: "14px" }} />
          </IconButton>
        </div>
      )}
    </div>
  );
}

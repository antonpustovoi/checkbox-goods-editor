import { Tooltip } from "@mui/material";
import { diffWordsWithSpace } from "diff";
import PropTypes from "prop-types";

DefaultCell.propTypes = {
  field: PropTypes.string,
  row: PropTypes.object,
};

export function DefaultCell(props) {
  const { row, field } = props;

  const title =
    row[field] !== row.original[field] ? (
      <div css={{ fontFamily: "monospace", fontWeight: "bold" }}>
        {diffWordsWithSpace(row.original[field], row[field]).map(
          (part, index) => {
            let backgroundColor = "none";
            if (part.added) backgroundColor = "#00B700";
            else if (part.removed) backgroundColor = "#FF0000";
            return (
              <span key={index} style={{ backgroundColor }}>
                {part.value.replace(" ", "\u00A0")}
              </span>
            );
          },
        )}
      </div>
    ) : (
      <div css={{ fontFamily: "monospace" }}>{row[field]}</div>
    );

  return (
    <Tooltip title={title}>
      <span css={{ overflow: "hidden", textOverflow: "ellipsis" }}>
        {row[field] ?? row.original[field]}
      </span>
    </Tooltip>
  );
}

import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";

DefaultCell.propTypes = {
  field: PropTypes.string,
  row: PropTypes.object
};

export function DefaultCell(props) {
  const { row, field } = props;

  const title =
    row[field] !== row.original[field] ? (
      <div css={{ fontFamily: "monospace" }}>
        <div>Попереднє зн.: {row.original[field]}</div>
        <div>Теперішнє зн.: {row[field]}</div>
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

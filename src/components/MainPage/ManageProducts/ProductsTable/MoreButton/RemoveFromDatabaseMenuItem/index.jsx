import RemoveIcon from "@mui/icons-material/DeleteOutline";
import { Dialog } from "@mui/material";
import PropTypes from "prop-types";

import { useDialogState } from "hooks/useDialogState";

import { MenuItem } from "../MenuItem";

import { RemoveFromDatabaseDialogContent } from "./RemoveFromDatabaseDialogContent";

RemoveFromDatabaseMenuItem.propTypes = {
  row: PropTypes.object,
};

export function RemoveFromDatabaseMenuItem(props) {
  const { row } = props;

  const { isOpen, onOpen, onClose } = useDialogState();

  return (
    <>
      <MenuItem
        icon={<RemoveIcon />}
        disabled={!row.original.id}
        onClick={onOpen}
      >
        Видалити з бази
      </MenuItem>
      <Dialog open={isOpen}>
        <RemoveFromDatabaseDialogContent data={row} onClose={onClose} />
      </Dialog>
    </>
  );
}

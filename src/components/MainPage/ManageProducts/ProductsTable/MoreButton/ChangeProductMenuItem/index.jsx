import ChangeIcon from "@mui/icons-material/Cached";
import { Dialog } from "@mui/material";
import PropTypes from "prop-types";

import { MenuItem } from "../MenuItem";
import { useDialogState } from "hooks/useDialogState";
import { ChangeProductDialogContent } from "./ChangeProductDialogContent";

ChangeProductMenuItem.propTypes = {
  row: PropTypes.object,
};

export function ChangeProductMenuItem(props) {
  const { row } = props;

  const { isOpen, onOpen, onClose } = useDialogState();

  return (
    <>
      <MenuItem icon={<ChangeIcon />} onClick={onOpen}>
        Змінити продукт
      </MenuItem>
      <Dialog open={isOpen} fullWidth>
        <ChangeProductDialogContent data={row} onClose={onClose} />
      </Dialog>
    </>
  );
}

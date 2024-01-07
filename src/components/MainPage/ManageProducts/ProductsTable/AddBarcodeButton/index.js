import QrCode2Icon from "@mui/icons-material/QrCode2";
import { Dialog, IconButton } from "@mui/material";
import PropTypes from "prop-types";

import { useDialogState } from "@hooks/useDialogState";

import { AddBarcodeDialogContent } from "./AddBarcodeDialogContent";

AddBarcodeButton.propTypes = {
  row: PropTypes.object
};

export function AddBarcodeButton(props) {
  const { row } = props;

  const { isOpen, onOpen, onClose } = useDialogState();

  return (
    <>
      <IconButton onClick={onOpen}>
        <QrCode2Icon />
      </IconButton>
      <Dialog open={isOpen} fullWidth>
        <AddBarcodeDialogContent currentRow={row} onClose={onClose} />
      </Dialog>
    </>
  );
}

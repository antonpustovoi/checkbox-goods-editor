import { useState } from "react";

export function useDialogState() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return { isOpen, onOpen: handleOpen, onClose: handleClose };
}

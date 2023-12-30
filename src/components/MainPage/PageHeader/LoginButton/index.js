import { useId } from "react";

import LoginIcon from "@mui/icons-material/Login";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { useDialogState } from "@hooks/useDialogState";
import * as Q from "@queries";

import { LoginForm } from "./LoginForm";

export function LoginButton() {
  const { enqueueSnackbar } = useSnackbar();

  const formId = useId();

  const { isOpen, onOpen, onClose } = useDialogState();

  const { mutate, isPending } = useMutation({
    mutationFn: Q.authorize,
    onSuccess: () => onClose(),
    onError: (error) =>
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 5000
      })
  });

  return (
    <>
      <IconButton onClick={onOpen}>
        <LoginIcon sx={{ color: "#FFFFFF" }} />
      </IconButton>
      <Dialog open={isOpen}>
        <DialogTitle>Авторизація</DialogTitle>
        <DialogContent style={{ paddingTop: "12px" }}>
          <LoginForm id={formId} onSubmit={mutate} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Закрити</Button>
          <LoadingButton
            type="submit"
            form={formId}
            loading={isPending}
            loadingIndicator="Авторизація…"
          >
            Авторизуватися
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

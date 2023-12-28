import { useState } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Grid, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import * as Q from "../../queries";

export function Authorization() {
  const { enqueueSnackbar } = useSnackbar();

  const [value, setValue] = useState("");

  const { mutate } = useMutation({
    mutationFn: Q.authorize,
    onError: (error) =>
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 5000
      })
  });

  const isAuthorized = Boolean(window.localStorage.getItem("token"));

  const handleChange = (event) => setValue(event.target.value);

  const handleClick = () => mutate({ pin_code: value });

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      style={{
        padding: "16px 24px"
      }}
    >
      <Grid item>
        <TextField label="PIN Касира" onChange={handleChange} />
      </Grid>
      <Grid item>
        <Button onClick={handleClick}>Авторизуватися</Button>
      </Grid>
      {isAuthorized && (
        <Grid item style={{ marginLeft: "auto" }}>
          <CheckCircleIcon
            style={{
              color: "#00FF00",
              height: "32px",
              width: "32px"
            }}
          />
        </Grid>
      )}
    </Grid>
  );
}

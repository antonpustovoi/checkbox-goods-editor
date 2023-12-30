import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Unstable_Grid2 as Grid } from "@mui/material";

import { LoginButton } from "./LoginButton";
import { css } from "./css";

export function PageHeader() {
  const isAuthorized = Boolean(window.localStorage.getItem("token"));

  return (
    <Grid container alignItems="center" css={css.root}>
      <Grid css={css.label}>
        <span style={{ fontWeight: "bold" }}>CheckBox</span> - редагування
        товарів
      </Grid>
      <Grid css={css.actions}>
        {isAuthorized && <CheckCircleIcon css={css.icon} />}
        <LoginButton />
      </Grid>
    </Grid>
  );
}

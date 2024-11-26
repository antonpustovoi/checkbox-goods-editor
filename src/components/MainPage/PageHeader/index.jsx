import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Grid2 as Grid } from "@mui/material";
import PropTypes from "prop-types";

import { LoginButton } from "./LoginButton";
import { css } from "./css";

PageHeader.propTypes = {
  isAuthorized: PropTypes.bool,
};

export function PageHeader(props) {
  const { isAuthorized } = props;

  return (
    <Grid container alignItems="center" css={css.root}>
      <Grid css={css.label}>
        <span style={{ fontWeight: "bold" }}>CheckBox</span> - редагування
        продуктів
      </Grid>
      <Grid css={css.actions}>
        {isAuthorized && <CheckCircleIcon css={css.icon} />}
        <LoginButton isAuthorized={isAuthorized} />
      </Grid>
    </Grid>
  );
}

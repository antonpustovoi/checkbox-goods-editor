import { Unstable_Grid2 as Grid } from "@mui/material";

import { ManageProducts } from "./ManageProducts";
import { PageHeader } from "./PageHeader";

export function MainPage() {
  const isAuthorized = Boolean(window.localStorage.getItem("token"));

  return (
    <Grid
      container
      direction="column"
      flexWrap="nowrap"
      style={{ height: "100vh" }}
    >
      <Grid>
        <PageHeader isAuthorized={isAuthorized} />
      </Grid>
      {isAuthorized && (
        <Grid xs>
          <ManageProducts />
        </Grid>
      )}
    </Grid>
  );
}

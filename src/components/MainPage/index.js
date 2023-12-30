import { Unstable_Grid2 as Grid } from "@mui/material";

import { ManageGoods } from "./ManageGoods";
import { PageHeader } from "./PageHeader";

export function MainPage() {
  return (
    <Grid
      container
      direction="column"
      flexWrap="nowrap"
      style={{ height: "100vh" }}
    >
      <Grid>
        <PageHeader />
      </Grid>
      <Grid xs>
        <ManageGoods />
      </Grid>
    </Grid>
  );
}

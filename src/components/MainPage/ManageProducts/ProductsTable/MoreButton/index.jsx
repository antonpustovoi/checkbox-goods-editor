import { useState } from "react";

import MoreIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu } from "@mui/material";

import { AddRowMenuItems } from "./AddRowMenuItems";
import { ChangeProductMenuItem } from "./ChangeProductMenuItem";
import { MoveRowMenuItems } from "./MoveRowMenuItems";
import { RemoveFromDatabaseMenuItem } from "./RemoveFromDatabaseMenuItem";
import { SaveProductMenuItem } from "./SaveProductMenuItem";
import { SyncProductMenuItem } from "./SyncProductMenuItem";

export function MoreButton(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.target);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreIcon />
      </IconButton>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
        <SyncProductMenuItem {...props} />
        <SaveProductMenuItem {...props} />
        <ChangeProductMenuItem {...props} />
        <RemoveFromDatabaseMenuItem {...props} />
        <AddRowMenuItems {...props} />
        <MoveRowMenuItems {...props} />
      </Menu>
    </>
  );
}

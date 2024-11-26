import PropTypes from "prop-types";
import { ListItemIcon, MenuItem as MuiMenuItem } from "@mui/material";

MenuItem.propTypes = {
  Icon: PropTypes.object,
};

export function MenuItem(props) {
  const { icon, children, ...restProps } = props;

  return (
    <MuiMenuItem {...restProps}>
      <ListItemIcon>{icon}</ListItemIcon>
      {children}
    </MuiMenuItem>
  );
}

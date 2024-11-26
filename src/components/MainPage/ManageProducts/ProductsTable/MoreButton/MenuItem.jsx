import { ListItemIcon, MenuItem as MuiMenuItem } from "@mui/material";
import PropTypes from "prop-types";

MenuItem.propTypes = {
  icon: PropTypes.object,
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

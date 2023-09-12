import {IconButton, Menu, MenuItem} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import {NavLink} from "react-router-dom";

const TopNavMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <div>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleClick}>
                <MenuIcon />
            </IconButton>
            <Menu
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                className= 'top-nav-menu'
            >
                <MenuItem onClick={handleClose} component={NavLink} to="/employees">Employee List</MenuItem>
                <MenuItem onClick={handleClose} component={NavLink} to="/formik-form">Add Employee with Formik</MenuItem>
                <MenuItem onClick={handleClose} component={NavLink} to="/hook-form">Add Employee with React Hook Form</MenuItem>
            </Menu>
        </div>
    )
}

export default TopNavMenu;

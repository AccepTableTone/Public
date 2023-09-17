import {IconButton, Menu, MenuItem} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useCallback } from "react";
import {NavLink, useLocation} from "react-router-dom";

const TopNavMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { pathname } = useLocation();
    
    const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    },[]);
    const handleClose = useCallback(() => {
        setAnchorEl(null);
    },[]);

    const emloyeeListPath = "/employees";
    const formikFormPath = "/formik-form";
    const hookFormPath = "/hook-form";

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
                <MenuItem onClick={handleClose} component={NavLink} to={emloyeeListPath} disabled={pathname === emloyeeListPath}>Employee List</MenuItem>
                <MenuItem onClick={handleClose} component={NavLink} to={formikFormPath} disabled={pathname === formikFormPath}>Add Employee with Formik</MenuItem>
                <MenuItem onClick={handleClose} component={NavLink} to={hookFormPath} disabled={pathname === hookFormPath}>Add Employee with React Hook Form</MenuItem>
            </Menu>
        </div>
    )
}

export default TopNavMenu;

import {AppBar, Toolbar, Typography} from "@mui/material";
import TopNavMenu from "./menu";
import React from "react";
import {useObservable} from "rxjs-hooks";
import {appService} from "../services/app.service";

const NavBar = () => {
    const pageTitle = useObservable(() => appService.pageTitle$, '');
    return (
        <AppBar position="static">
            <Toolbar>
                <TopNavMenu></TopNavMenu>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    EMPLOYEE MANAGEMENT {!!pageTitle ? ' - ' : ''}  {pageTitle.toLowerCase()}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;

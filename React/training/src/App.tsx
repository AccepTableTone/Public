import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import EmployeeList from "./features/employees/components/list";
import FormikForm from "./features/employees/components/add-edit-formik-form";
import HookForm from "./features/employees/components/add-edit-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer} from 'react-toastify';
import NavBar from "./components/navbar";
import Backdrop from '@mui/material/Backdrop';
import {CircularProgress} from "@mui/material";
import {useObservable} from "rxjs-hooks";
import {appService} from "./services/app.service";

const App = () => {
    const isLoading = useObservable(() => appService.isLoading$, false)

    return (
    <div className="App">
        <NavBar/>
        <div className={'content-container'}>
            <Routes>
                <Route path="/" element={<EmployeeList />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/formik-form/:id?" element={<FormikForm />} />
                <Route path="/hook-form/:id?" element={<HookForm />} />
            </Routes>
        </div>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        <ToastContainer />
    </div>
  );
}

export default App;

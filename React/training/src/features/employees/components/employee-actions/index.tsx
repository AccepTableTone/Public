import {useObservable} from "rxjs-hooks";
import {employeeService} from "../../services/employee.service";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import React, {useState} from "react";
import {Employee} from "../../types";
import {Link} from "react-router-dom";


const EmployeeActions: React.FC<{ selectedEmployee: Employee | null, deleteEmployee: ()=> void }>  = ({selectedEmployee, deleteEmployee}) => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const handleCloseDialog = () => {
        setShowConfirmDialog(false);
    };
    const deletSelectedEmployee = () => {
        deleteEmployee();
        handleCloseDialog();
    }
    return (
        <div className='action-container'>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <Button color={"inherit"}
                        onClick={() => employeeService.selectEmployee(null)}
                        disabled={!selectedEmployee}
                        variant="contained"
                        className="margin-right-10"
                >Cancel</Button>

                <Button color={"error"}
                        onClick={() => setShowConfirmDialog(true)}
                        disabled={!selectedEmployee}
                        variant="contained"
                >Delete</Button>

                <Button color={"primary"}
                        disabled={!selectedEmployee}
                        component={Link}
                        to={`/formik-form/${selectedEmployee?.id}`}
                        variant="contained"
                >Edit with Formik</Button>

                <Button  color={"primary"}
                         disabled={!selectedEmployee}
                         component={Link}
                         to={`/hook-form/${selectedEmployee?.id}`}
                         variant="contained"
                >Edit with React Hook Form</Button>
            </Stack>

            <Dialog
                open={showConfirmDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Delete Employee Record?</DialogTitle>
                <DialogContent>You are about to delete an employee record. Are you sure?</DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="contained" color={"inherit"}>No</Button>
                    <Button onClick={deletSelectedEmployee} variant="contained" color={"error"} >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EmployeeActions;

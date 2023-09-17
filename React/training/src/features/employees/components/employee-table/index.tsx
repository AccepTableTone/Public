import {Employee} from "../../types";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useMemo } from "react";
import {employeeService} from "../../services/employee.service";

const EmployeeTable: React.FC<{ employees: Employee[], selectedEmployee: Employee | null }> = ({employees, selectedEmployee}) => {
    const selectEmployee = (employee: Employee) => employeeService.selectEmployee(employee)

    const employeeList = useMemo(() => {
        return employees.map((employee) => (
            <TableRow
                onClick={() => selectEmployee(employee)}
                selected={selectedEmployee?.id === employee.id}
                key={employee.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className='table-row'
            >
                <TableCell component="th" scope="row">
                    {employee.firstName}
                </TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phoneNumber}</TableCell>
            </TableRow>
        ))
    }, [employees, selectedEmployee]);

    return (
        <div className='table-container'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employeeList}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default EmployeeTable;

import {appService} from "../../../../services/app.service";
import {useEffect} from "react";
import {useObservable} from "rxjs-hooks";
import {employeeService} from "../../services/employee.service";
import EmployeeTable from "../employee-table";
import EmployeeActions from "../employee-actions";
import {toastService} from "../../../../services/toast.service";

const EmployeeList = () => {
    const employeeList = useObservable(() => employeeService.employeeList$, [])
    const selectedEmployee = useObservable(() => employeeService.selectedEmployee$, null)
    
    const resetEmployeeList = () => {
        employeeService.selectEmployee(null);
        employeeService.getEmployees();
    };
    const deleteEmployee = () => {
        if(!!selectedEmployee?.id){
            employeeService.deleteEmployee(selectedEmployee.id).subscribe(successful => {
                if(successful){
                    toastService.success("Employee successfully deleted.");
                    resetEmployeeList();
                }
            })
        }
    }


    useEffect(() => {
        appService.setPageTitle('Employee List');
        resetEmployeeList();
    },[]);

    return (
        <>
            <EmployeeTable employees={employeeList} selectedEmployee={selectedEmployee}/>
            <EmployeeActions  selectedEmployee={selectedEmployee} deleteEmployee={deleteEmployee}/>
        </>
    );
}

export default EmployeeList;

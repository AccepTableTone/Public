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
    const deleteEmployee = () => {
        // @ts-ignore
        employeeService.deleteEmployee(selectedEmployee.id).subscribe(successful => {
            if(successful){
                toastService.success("Employee successfully deleted.");
                employeeService.selectEmployee(null);
                employeeService.getEmployees();
            }
        })
    }

    useEffect(() => {
        appService.setPageTitle('Employee List');
        employeeService.selectEmployee(null);
        employeeService.getEmployees();
    },[]);

    return (
        <div>
            <EmployeeTable employees={employeeList} selectedEmployee={selectedEmployee}/>
            <EmployeeActions  selectedEmployee={selectedEmployee} deleteEmployee={deleteEmployee}/>
        </div>
    );
}

export default EmployeeList;

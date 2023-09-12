import {BehaviorSubject, map, Observable, of, switchMap} from 'rxjs';
import { Employee} from "../types";
import {AxiosResponse} from "axios";
import {axios} from "../../../lib/axios";
import {AppConstants} from "../../../constants";
import {appService} from "../../../services/app.service";

class EmployeeService {
    private readonly API_URL = 'https://procom-interview-employee-test.azurewebsites.net/employee';

    /** NOTE: employee list */
    private employeeListSubject = new BehaviorSubject<Employee[]>([]);
    employeeList$: Observable<Employee[]> = this.employeeListSubject.asObservable();

    /** NOTE: selected employee - existing or empty for create */
    private selectedEmployeeSubject = new BehaviorSubject<Employee | null>(null);
    selectedEmployee$ : Observable<Employee | null> = this.selectedEmployeeSubject.asObservable();

    /** NOTE: set selected employee */
    selectEmployee = (selectedEmployee: Employee | null) => {
        this.selectedEmployeeSubject.next(selectedEmployee);
    }

    /** NOTE: get employee list */
    getEmployees = ():void => {
        this.loading();
        axios.get<Employee[]>(this.API_URL).subscribe((axiosResponse) => {
            console.log("EMPLOYEE LIST: ",axiosResponse);
            this.doneLoading();
            this.employeeListSubject.next(axiosResponse.data);
        })
    }

    /** NOTE: get employee by id */
    getEmployee = (employeeId: number):Observable<Employee> => {
        this.loading();
        return axios.get<Employee>(`${this.API_URL}/${employeeId}`).pipe(
            map(axiosResponse => {
                console.log("EMPLOYEE: ",axiosResponse);
                this.doneLoading();
                return axiosResponse.data;
            })
        )
    }

    /** NOTE: add new employee */
    addEmployee = (newEmployee: Employee) => {
        this.loading();
        return axios.post(this.API_URL, newEmployee).pipe(
            switchMap(axiosResponse => {
                console.log("ADD EMPLOYEE: ", axiosResponse);
                return this.wasSuccessful(axiosResponse);
            })
        )
    }

    /** NOTE: update existing employee */
    updateEmployee = (existingEmployee: Employee) => {
        this.loading();
        return axios.put(`${this.API_URL}/${existingEmployee.id}`, existingEmployee).pipe(
            switchMap(axiosResponse => {
                console.log("UPDATE EMPLOYEE: ", axiosResponse);
                return this.wasSuccessful(axiosResponse);
            })
        )
    }

    /** NOTE: delete existing employee by id */
    deleteEmployee = (employeeId: number): Observable<boolean> => {
        this.loading();
        return axios.delete(`${this.API_URL}/${employeeId}`).pipe(
            switchMap(axiosResponse => {
                console.log("DELETE EMPLOYEE: ", axiosResponse);
                return this.wasSuccessful(axiosResponse);
            })
        )
    }

    /** NOTE: was http request successful */
    private wasSuccessful = (axiosResponse: AxiosResponse) => {
        this.doneLoading();
        return of(axiosResponse.status === AppConstants.HttpStatus.Success || axiosResponse.status === AppConstants.HttpStatus.Created);
    }
    private loading = () => {
        appService.setIsLoading(true);
    }
    private doneLoading = () => {
        appService.setIsLoading(false);
    }
}

export const employeeService: EmployeeService = new EmployeeService();

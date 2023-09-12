import { employeeService } from "./employee.service";
import { toastService } from "../../../services/toast.service";
import { Employee, Address } from "../types";
import * as Yup from "yup";

class HelperService {
    getBlankEmployee = (): Employee => {
        return {
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            addresses: [this.getBlankAddress()]
        };
    };

    getBlankAddress = (): Address => {
        return {
            streetName: '',
            postalCode: '',
            apartmentNumber: '',
            state: '',
            country: ''
        };
    };

    updateEmployee = (values: Employee, navigate: (url: string) => void) => {
        employeeService.updateEmployee(values).subscribe(successful => {
            if (successful) {
                toastService.success("Employee successfully updated.");
                navigate("/employees");
            }
        });
    };

    addEmployee = (values: Employee, navigate: (url: string) => void) => {
        employeeService.addEmployee(values).subscribe(successful => {
            if (successful) {
                toastService.success("New employee added.");
                navigate("/employees");
            }
        });
    };

    getYupValidationSchema = () => {
        return Yup.object<Employee>().shape({
            id: Yup.number().nullable(),
            firstName: Yup.string().required("First name is required."),
            lastName: Yup.string().required("Last name is required."),
            email: Yup.string().required("Email address is required.").matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Email address is not valid."),
            phoneNumber: Yup.string().required("Phone number is required."),
            addresses: Yup.array().of(
                Yup.object({
                    streetName: Yup.string().required("Street name is required."),
                    postalCode: Yup.string().required("Postal code is required."),
                    state: Yup.string().required("State is required."),
                    country: Yup.string().required("Country is required.")
                })
            )
        });
    };
}

export const helperService: HelperService = new HelperService();

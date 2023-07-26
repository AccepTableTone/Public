import {appService} from "../../../../services/app.service";
import React, {useEffect} from "react";
import {FieldArray, useFormik} from "formik";
import {Button, Stack, TextField} from "@mui/material";
import {Link, useParams, useNavigate} from "react-router-dom";
import {employeeService} from "../../services/employee.service";
import {toastService} from "../../../../services/toast.service";
import {Employee} from "../../types";

const FormikForm = () => {
    const params = useParams();
    const navigate = useNavigate();

    let isEditing = false;
    let employeeId = undefined;
    let initialEmployeeValues: Employee = {
        id:undefined,
        firstName:'',
        lastName: '',
        email: '',
        phoneNumber:'',
        addresses: [{
            streetName: '',
            postalCode: '',
            apartmentNumber: undefined,
            state: '',
            country: ''
        }]
    };

    useEffect(() => {
        console.log("RENDERING FORMIK")
        isEditing = !!params.id;

        if(isEditing){
            employeeId = parseInt(params.id || '0', 10);
            populateForm(employeeId);
        }
        appService.setPageTitle(`${isEditing ? 'Edit ' : 'Add'} Formik Employee Form`);
    },[]);

    const populateForm = (employeeId: number) => {
        employeeService.getEmployee(employeeId).subscribe(employee => {
            initialEmployeeValues = employee;
            console.log("EMPLOYEE FOR EDIT: ", employee);
        })
    }

    const formik = useFormik({
        initialValues: initialEmployeeValues,
        enableReinitialize: true,
        onSubmit: values => {
            console.log("FORM VALUES: ", values)

            if(isEditing){
                employeeService.updateEmployee(values).subscribe(successful => {
                    if(successful){
                        toastService.success("Employee successfully updated.");
                        navigate("/employees");
                    }
                });
            }else{
                employeeService.addEmployee(values).subscribe(successful => {
                    if(successful){
                        toastService.success("New employee added.");
                        navigate("/employees");
                    }
                });
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='form-container'>
                <div className={'flex-row'}>
                    Employee Details
                </div>
                <div className={'flex-row'}>
                    <div>
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            fullWidth
                        />
                    </div>
                    <div>
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            fullWidth
                        />
                    </div>
                </div>
                <div className={'flex-row'}>
                    <div>
                        <TextField
                            label="Email Address"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            fullWidth
                        />
                    </div>
                    <div>
                        <TextField
                            label="Phone Number"
                            name="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            fullWidth
                        />
                    </div>
                </div>
                <div className={'flex-row'}>
                    Address
                </div>

                <FieldArray
                    name={"addresses"}
                    validateOnChange={false}
                    render = {() => (
                        <div>
                            {formik.values.addresses?.map((address, index) => (
                                <div key={index}>
                                    <div className={'flex-row'}>
                                        <div>
                                            <TextField
                                                label="Street"
                                                name={`addresses[${index}].streetName`}
                                                value={address.streetName}
                                                onChange={formik.handleChange}
                                                fullWidth
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                label="Apartment #"
                                                type="number"
                                                name={`addresses[${index}].apartmentNumber`}
                                                value={address.apartmentNumber}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className={'flex-row'}>
                                        <div>
                                            <TextField
                                                label="Province/State"
                                                name={`addresses[${index}].state`}
                                                value={address.state}
                                                onChange={formik.handleChange}
                                                fullWidth
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                label="Country"
                                                name={`addresses[${index}].country`}
                                                value={address.country}
                                                onChange={formik.handleChange}
                                                fullWidth
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <TextField
                                            label="Postal Code"
                                            name={`addresses[${index}].postalCode`}
                                            value={address.postalCode}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                </div>

                            ))}
                        </div>
                    )}
                />
                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                    <Button color={"inherit"}
                            component={Link}
                            to={'/employees'}
                            variant="contained"
                            className="margin-right-10"
                    >Cancel</Button>
                    <Button  color={"primary"}
                             disabled={false}
                             type={"submit"}
                             variant="contained"
                    >Submit</Button>
                </Stack>
            </div>
        </form>
    );
}

export default FormikForm;

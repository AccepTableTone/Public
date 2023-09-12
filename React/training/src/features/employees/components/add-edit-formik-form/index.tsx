import {appService} from "../../../../services/app.service";
import {useEffect, useState} from "react";
import {ErrorMessage, FieldArray, Form, Formik} from "formik";
import { Button, TextField} from "@mui/material";
import {useParams, useNavigate} from "react-router-dom";
import {employeeService} from "../../services/employee.service";
import {Employee} from "../../types";
import {helperService} from "../../services/helper.service";
import Icon from '@mui/material/Icon';
import WarningIcon from '@mui/icons-material/Warning';
import AddEditActions from "../add-edit-actions";

const FormikForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState<Employee>(helperService.getBlankEmployee());
    const validationSchema = helperService.getYupValidationSchema();

    useEffect(() => {
        const isEditing = !!id;
        if(isEditing){
            populateForm(parseInt(id || '0', 10));
        }else{
            setFormValues(helperService.getBlankEmployee());
        }
        appService.setPageTitle(`${isEditing ? 'Edit ' : 'Add'} Formik Employee Form`);
    },[id]);

    const populateForm = (employeeId: number) => {
        employeeService.getEmployee(employeeId).subscribe(employee => {
            employee.addresses?.forEach(address => address.apartmentNumber = address.apartmentNumber === 0 ? null : address.apartmentNumber);
            setFormValues(employee);
        })
    }

    const submitForm = (values : Employee) => {
        values.addresses?.forEach(address => address.apartmentNumber = address.apartmentNumber === null ? 0 : address.apartmentNumber);
        if(!!id){
            helperService.updateEmployee(values, navigate);
        }else{
            helperService.addEmployee(values, navigate);
        }
    };

    const addAddress = (values: Employee) => {
        setFormValues({
            ...values,
            addresses: [...values.addresses || [], helperService.getBlankAddress()]
        })
    }

    const removeAddress = (index: number, values: Employee) => {
        const newAddresses = [...values.addresses || []];
        newAddresses?.splice(index, 1);
        setFormValues({
            ...values,
            addresses: newAddresses
        })
    }

    const renderError = (message:string) => <div className='flex-row error-div'><WarningIcon/><div className={'error-message'}>{message}</div></div>;

    return (
        <Formik
            initialValues = {formValues}
            onSubmit = {(values, actions) => {
                submitForm(values);
                actions.setSubmitting(false);
            }}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {formik => (
                <Form>
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
                                    fullWidth={true}
                                />
                                <ErrorMessage name="firstName" render={renderError} />
                            </div>
                            <div>
                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    fullWidth={true}
                                />
                                <ErrorMessage name="lastName" render={renderError} />
                            </div>
                        </div>
                        <div className={'flex-row'}>
                            <div>
                                <TextField
                                    label="Email Address"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    fullWidth={true}
                                />
                                <ErrorMessage name="email" render={renderError} />
                            </div>
                            <div>
                                <TextField
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    fullWidth={true}
                                />
                                <ErrorMessage name="phoneNumber" render={renderError} />
                            </div>
                        </div>
                        <div className={'flex-row'}>
                            <Button onClick={() => addAddress(formik.values)} variant="contained">Addresses <Icon>add</Icon></Button>
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
                                                        fullWidth={true}
                                                    />
                                                    <ErrorMessage name={`addresses[${index}].streetName`} render={renderError} />
                                                </div>
                                                <div>
                                                    <TextField
                                                        label="Apartment #"
                                                        type="number"
                                                        name={`addresses[${index}].apartmentNumber`}
                                                        value={address.apartmentNumber}
                                                        onChange={formik.handleChange}
                                                        fullWidth={false}
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
                                                        fullWidth={true}
                                                    />
                                                    <ErrorMessage name={`addresses[${index}].state`} render={renderError} />
                                                </div>
                                                <div>
                                                    <TextField
                                                        label="Country"
                                                        name={`addresses[${index}].country`}
                                                        value={address.country}
                                                        onChange={formik.handleChange}
                                                        fullWidth={true}
                                                    />
                                                    <ErrorMessage name={`addresses[${index}].country`} render={renderError} />
                                                </div>
                                            </div>
                                            <div className={'margin-bottom-20'}>
                                                <TextField
                                                    label="Postal Code"
                                                    name={`addresses[${index}].postalCode`}
                                                    value={address.postalCode}
                                                    onChange={formik.handleChange}
                                                    inputProps={{ style: { textTransform: "uppercase" } }}
                                                    fullWidth={false}
                                                />
                                                <ErrorMessage name={`addresses[${index}].postalCode`} render={renderError} />
                                            </div>
                                            <div>
                                                {index > 0 ? (
                                                    <div className={'margin-bottom-20'}>
                                                        <Button onClick={() => removeAddress(index, formik.values)} variant="contained"><Icon>delete</Icon></Button>
                                                    </div>)
                                                    :
                                                    <div className={'margin-bottom-20'}><hr/></div>
                                                }
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            )}
                        />
                        <AddEditActions/>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default FormikForm;

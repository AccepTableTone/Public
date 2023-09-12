import {appService} from "../../../../services/app.service";
import {useEffect} from "react";
import {useFieldArray, useForm} from 'react-hook-form'
import {Employee} from "../../types";
import {Button} from "@mui/material";
import {HookFormTextInput} from "../../../../components/hook-form-text-input";
import Icon from "@mui/material/Icon";
import {useNavigate, useParams} from "react-router-dom";
import {helperService} from "../../services/helper.service";
import {employeeService} from "../../services/employee.service";
import {HookFormNumberInput} from "../../../../components/hook-form-number-input";
import { yupResolver } from "@hookform/resolvers/yup";
import AddEditActions from "../add-edit-actions";

const HookForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const {reset, handleSubmit, control} = useForm<Employee>({
        defaultValues: helperService.getBlankEmployee(),
        resolver: yupResolver(helperService.getYupValidationSchema())
    });
    const { fields, append, remove} = useFieldArray({control, name: "addresses"});

    useEffect(() => {
        const isEditing = !!id;
        if(isEditing){
            populateForm(parseInt(id || '0', 10));
        }else{
            reset(helperService.getBlankEmployee());
        }
        appService.setPageTitle(`${isEditing ? 'Edit ' : 'Add'} React Hook Form`);
    },[id]);

    const populateForm = (employeeId: number) => {
        employeeService.getEmployee(employeeId).subscribe(employee => {
            employee.addresses?.forEach(address => address.apartmentNumber = address.apartmentNumber === '' ? null : address.apartmentNumber);
            reset(employee)
        })
    }
    const submitForm = (values:Employee) => {
        values.addresses?.forEach(address => address.apartmentNumber = address.apartmentNumber === '' ? 0 : address.apartmentNumber);
        if(!id){
            helperService.updateEmployee(values, navigate);
        }else{
            helperService.addEmployee(values, navigate);
        }
    }

    const addAddress = () => {
        append( helperService.getBlankAddress());
    }

    const removeAddress = (index: number) => {
        remove(index);
    }

    return (        
        <form onSubmit={handleSubmit(submitForm)}>
            <div className='form-container'>
                <div></div>
                <div className={'flex-row'}>
                    Employee Details
                </div>
                <div className={'flex-row'}>
                    <div>
                        <HookFormTextInput
                            label="First Name"
                            name="firstName"
                            control={control}
                            fullWidth={true}
                        />     
                    </div>
                    <div>
                        <HookFormTextInput
                            label="Last Name"
                            name="lastName"
                            control={control}
                            fullWidth={true}
                        />
                    </div>
                </div>
                <div className={'flex-row'}>
                    <div>
                        <HookFormTextInput
                            label="Email Address"
                            name="email"
                            control={control}
                            fullWidth={true}
                        />
                    </div>
                    <div>
                        <HookFormTextInput
                            label="Phone Number"
                            name="phoneNumber"
                            control={control}
                            fullWidth={true}
                        />
                    </div>
                </div>
                <div className={'flex-row'}>
                    <Button onClick={() => addAddress()} variant="contained">Addresses <Icon>add</Icon></Button>
                </div>
                {
                    fields.map((address, index) => {
                        return (
                            <div key={index}>
                                <div className={'flex-row'}>
                                    <div>
                                        <HookFormTextInput
                                            label="Street"
                                            name={`addresses[${index}].streetName`}
                                            control={control}
                                            fullWidth={true}
                                        />
                                    </div>
                                    <div>
                                        <HookFormNumberInput
                                            label="Apartment #"
                                            name={`addresses[${index}].apartmentNumber`}
                                            control={control}
                                            fullWidth={false}
                                        />
                                    </div>
                                </div>
                                <div className={'flex-row'}>
                                    <div>
                                        <HookFormTextInput
                                            label="Province/State"
                                            name={`addresses[${index}].state`}
                                            control={control}
                                            fullWidth={true}
                                        />
                                    </div>
                                    <div>
                                        <HookFormTextInput
                                            label="Country"
                                            name={`addresses[${index}].country`}
                                            control={control}
                                            fullWidth={true}
                                        />
                                    </div>
                                </div>
                                <div className={'margin-bottom-20'}>
                                    <HookFormTextInput
                                        label="Postal Code"
                                        name={`addresses[${index}].postalCode`}
                                        control={control}
                                        fullWidth={false}
                                        inputProps={{ style: { textTransform: "uppercase" } }}
                                    />
                                </div>
                                <div>
                                    {index > 0 ? (
                                            <div className={'margin-bottom-20'}>
                                                <Button onClick={() => removeAddress(index)} variant="contained"><Icon>delete</Icon></Button>
                                            </div>)
                                        :
                                        <div className={'margin-bottom-20'}><hr/></div>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                <AddEditActions/>
            </div>
        </form>
    );
}

export default HookForm;

import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import {HookFormProps} from "../features/employees/types";
import WarningIcon from '@mui/icons-material/Warning';

export const HookFormTextInput = ({ name, control, label, fullWidth }: HookFormProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                         field: { onChange, value },
                         fieldState: { error },
                         formState,
                     }) => (
                <div>
                    <TextField
                        onChange={onChange}
                        value={value}
                        label={label}
                        fullWidth={fullWidth}
                    />       
                    {!!error?.message ? 
                        (<div className='flex-row error-div'><WarningIcon/><div className={'error-message'}>{error?.message}</div></div>)
                    : null}
                </div>
            )}
        />
    );
};

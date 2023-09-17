import {Button, Stack} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

const AddEditActions = () => {
    return (<Stack direction="row" justifyContent="flex-end" spacing={1}>
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
            </Stack>);
}

export default React.memo(AddEditActions);

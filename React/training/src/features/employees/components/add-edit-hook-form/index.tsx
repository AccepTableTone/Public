import {appService} from "../../../../services/app.service";
import {useEffect} from "react";

const HookForm = () => {
    useEffect(() => {
        console.log("RENDERING HOOK FORM")
        appService.setPageTitle('React Hook Form');
    },[]);

    return (
        <div></div>
    );
}

export default HookForm;

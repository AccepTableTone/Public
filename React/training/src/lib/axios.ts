import Axios from 'axios-observable'
import {AppConstants} from "../constants";
import {toastService} from "../services/toast.service";
import {of} from "rxjs";

export const axios = Axios.create({});

axios.interceptors.response.use(
    response => {
            return response
        },
    function(error){
            if(error.response.status === AppConstants.HttpStatus.NotFound ){
                toastService.error('The requested record could not be found.');
            }else {
                toastService.error(`There was an unexpected error. ${error?.response?.data}`);
            }

            return of(false);
        }
    )

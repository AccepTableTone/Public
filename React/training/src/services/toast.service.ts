import {toast} from "react-toastify";

class ToastService {
    private toastConfig = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
    };

    success = (message: string) => {
        // @ts-ignore
        toast.success(message, this.toastConfig);
    }

    error = (message: string) => {
        // @ts-ignore
        toast.error(message, this.toastConfig);
    }
}

export const toastService: ToastService = new ToastService();

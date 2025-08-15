import { toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
    progressClassName: "fancy-progress-bar",
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
};

type ToastType = 'success' | 'error' | 'info' | 'warning';

export const showToast = (message: string, type: ToastType = 'success') => {
    switch(type) {
        case 'success':
            toast.success(message, defaultOptions);
            break;
        case 'error':
            toast.error(message, { ...defaultOptions, autoClose: 5000 });
            break;
        case 'info':
            toast.info(message, defaultOptions);
            break;
        case 'warning':
            toast.warning(message, defaultOptions);
            break;
        default:
            toast(message, defaultOptions);
    }
};

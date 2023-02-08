import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const showToast = (message: string) => toast(message);
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT
  });
};
export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT
  });
};
export const showAxiosErrorToast = (error: AxiosError | unknown) => {
  const axiosError = error as AxiosError;
  toast.error(axiosError.message, {
    position: toast.POSITION.TOP_RIGHT
  });
};

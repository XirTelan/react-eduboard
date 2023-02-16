import { AxiosError } from 'axios';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const showSuccessToast = (message: string) => {
  Notify.success(message);
};
export const showErrorToast = (message: string) => {
  Report.failure('Произошла ошибка', `${message}`, 'ОК');
};
export const showAxiosErrorToast = (error: AxiosError | unknown) => {
  const axiosError = error as AxiosError;
  Report.failure('Произошла ошибка', `${axiosError.response?.data}`, 'ОК');
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const showAlertConfirm = (message: string, id: number, onConfirm: (id: number) => void) => {
  Confirm.show('Вы уверены?', `${message}`, 'Ok', 'Нет', () => {
    onConfirm(id);
  });
};

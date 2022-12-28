import { AxiosError } from 'axios';
import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast'
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true
});

export function swalLoading() {
  Swal.fire({
    title: 'Сохраняем...',
    html: 'Пожалуйста подождите...',
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading(null);
    }
  });
}

export async function displayErrorToast(error: any) {
  const axiosError = error as AxiosError;
  console.log('Axios error', error);
  await Toast.fire({
    icon: 'error',
    title: 'Ошибка',
    text: axiosError.message
  });
}
export async function displaySuccessToast() {
  await Toast.fire({
    icon: 'success',
    title: 'Успех'
  });
}

import Swal from 'sweetalert2';

export function customAlert(title: string, confirmButtonText: string, onCofirm: any) {
  Swal.fire({
    title,
    confirmButtonText,
    cancelButtonText: 'Отмена',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d32f2f'
  }).then((res) => {
    if (res.isConfirmed) onCofirm();
  });
}

import Swal from 'sweetalert2'

export const showError = async (message: string) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
    showConfirmButton: false
  })
}

import Swal from 'sweetalert2'

export const showSuccess = (message: string) => {
  Swal.fire({
    icon: 'success',
    title: 'Éxito!',
    text: message,
    showConfirmButton: false
  })
}

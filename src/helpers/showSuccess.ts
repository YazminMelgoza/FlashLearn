import Swal from 'sweetalert2'

export const showSuccess = async (message: string) => {
  Swal.fire({
    icon: 'success',
    title: 'Éxito!',
    text: message,
    showConfirmButton: false
  })
}

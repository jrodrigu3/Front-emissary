import Swal from 'sweetalert2';
import { EIconType } from '../enum/iconType.enum';
import { EModalMessage } from '../enum/modalMessage.enum';
import { ModalConfirmation } from '../interfaces/base/modalConfirmation.interface';

export let SwalUtils = {
  timeModal: (title: string, icon: EIconType, timer: number = 1500) => {
    Swal.fire({
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: timer
    })
  },
  getTemplateQuention(title: string): any {
    return Swal.fire({
      title,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      buttonsStyling: false,
      heightAuto: false,
      focusConfirm: false,
      customClass: {
        confirmButton: 'btn btn-success mr-10px',
        cancelButton: 'btn btn-danger'
      }
    });
  },
}

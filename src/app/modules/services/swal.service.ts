import { Injectable } from '@angular/core';
const Swal = require('sweetalert2');

@Injectable({ providedIn: 'root' })
export class SwalService {
  fireSwal(title: string, text: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    return swalWithBootstrapButtons.fire({
      title: title,
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    });
  }
}

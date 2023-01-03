import { Component, inject, OnInit } from '@angular/core';
import { EModalMessage } from 'src/app/core/enum/modalMessage.enum';
import { SwalAlert } from 'src/app/core/interfaces/generales/swalAltert.interface';
import { SwalUtils } from 'src/app/core/utils/swal-util';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private authService = inject(AuthService);
  constructor() { }

  ngOnInit(): void {
  }


  logout(): void {
    this.authService.logout();
  }

  confirmOption(): void {
    const title = EModalMessage.logout;
    SwalUtils.getTemplateQuention(title).then((result: SwalAlert) => {
      if (result.value) {
        this.logout();
      }
    });
  }

}

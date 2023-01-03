import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/base/token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private tokenService = inject(TokenService);

  constructor() {
  }

  login(): void {
    this.router.navigate(['home/address']);
  }

  logout(): void {
    this.tokenService.removeToken();
    this.router.navigate(['/auth/login'])
  }

}

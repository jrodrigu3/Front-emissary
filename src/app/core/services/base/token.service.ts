import { Injectable } from '@angular/core';

const TOKEN: string = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
    this.initializeLocalStorage();

  }

  private initializeLocalStorage(): void {
    if (this.existToken()) {
      // localStorage.setItem(TOKEN, '');
    } else {
      localStorage.setItem(TOKEN, 'qwertyuiopasdfghjklñ');
    }
  }

  existToken(): boolean {
    const dataTest = this.getToken();
    return dataTest !== '' ? true : false;
  }

  getToken(): string {
    return localStorage.getItem(TOKEN) || '';
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN);
  }

}

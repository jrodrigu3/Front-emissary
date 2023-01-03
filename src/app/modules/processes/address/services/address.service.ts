import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { BehaviorSubject, map, Observable, of, take } from 'rxjs';
import { Address, AddressList } from 'src/app/core/interfaces/processes/address.interface';
import { HttpBaseService } from 'src/app/core/services/base/http-base.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private _httpBase = inject(HttpBaseService);
  private _router = inject(Router);
  private http = inject(HttpClient);

  urlService: string = "https://localhost:44376/api/direcciones";

  private itemAddress$: BehaviorSubject<Address[]> = new BehaviorSubject<Address[]>([]);
  public dataAddress$: Observable<Address[]> = this.itemAddress$.asObservable();

  constructor() { }

  getAddress(filter: string = ""): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.urlService}?filter=${filter}`).pipe(take(1), map(response => {
      return response;
    }));
  }

  getOneAddress(idAddress: number): Observable<Address> {
    return this.http.get<Address>(`${this.urlService}/${idAddress}`);
  }

  saveAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.urlService}`, address);
  }

  editAddress(address: Address, idAddress: number): Observable<Address> {
    return this.http.put<Address>(`${this.urlService}/${idAddress}`, address);
  }

  deleteAddress(idAddress: number): Observable<Address> {
    return this.http.delete<Address>(`${this.urlService}/${idAddress}`);
  }

  routerNavigate(ruta: string): void {
    this._router.navigate([ruta]);
  }

  
}


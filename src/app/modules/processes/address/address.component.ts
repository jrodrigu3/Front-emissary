import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAddressComponent } from '../address/components/add-address/add-address.component';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  private _matDialog = inject(MatDialog);

  constructor() { }

  ngOnInit(): void {
  }


  public abrirForm(id: number = 0, crearEditE: string = '') {
    const dialogRef = this._matDialog.open(AddAddressComponent, {
      data: {
        idEncuesta: id
      }
    });
  }

}
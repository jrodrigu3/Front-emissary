import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EIconType } from 'src/app/core/enum/iconType.enum';
import { EModalMessage } from 'src/app/core/enum/modalMessage.enum';
import { ERoutes } from 'src/app/core/enum/operationType';
import { paisObjects } from 'src/app/core/enum/rol.enum';
import { IQueryParam } from 'src/app/core/interfaces/generales/query.interface';
import { SwalAlert } from 'src/app/core/interfaces/generales/swalAltert.interface';
import { Address } from 'src/app/core/interfaces/processes/address.interface';
import { SwalUtils } from 'src/app/core/utils/swal-util';
import { AddressService } from '../../services/address.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit, OnDestroy {

  private _route = inject(ActivatedRoute);
  private _addressService = inject(AddressService);
  private _router = inject(Router);
  isEditActivate: boolean = false;
  private route = inject(ActivatedRoute);
  private unsubcribe$ = new Subject<void>();

  params!: IQueryParam;
  isEdit: boolean = false;
  idAddress: number = 0;
  bottonName: string = 'BOTTON.SAVE';
  titleName: string = 'TITLE.CREATE_ADDRESS';
  arrayPaises = paisObjects;
  isLoading = false;

  form = new FormGroup({
    alias: new FormControl('', Validators.required),
    nombrePersona: new FormControl('', Validators.required),
    telefono: new FormControl(0, Validators.required),
    pais: new FormControl(0, Validators.required),
    codigoPostal: new FormControl(0, Validators.required),
    calleNumero: new FormControl('', Validators.required),
    referencia: new FormControl('', Validators.required),
    correoElectronico: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    colonia: new FormControl('', Validators.required),
  });

  constructor() {
    this.isEdit = this._route.snapshot?.url[0]?.path === ERoutes.edit;
    this.idAddress = +this._route.snapshot?.url[1]?.path || 0;
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.unsubcribe$)).subscribe((params) => {
      this.params = params;
    });
    if (this.idAddress > 0) {
      this.bottonName = 'BOTTON.EDIT'
      this.titleName = 'TITLE.EDIT_ADDRESS';
      this.isEditActivate = true;
      this.form.disable();
      this.searchAddressId(this.idAddress);
    }
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  confirmOption(confirm: boolean): void {
    let title = '';
    title = confirm ? EModalMessage.saveConfirmation : EModalMessage.cancelConfirmation;
    SwalUtils.getTemplateQuention(title).then((result: SwalAlert) => {
      if (result.value) {
        confirm ? this.saveEditAddress() : this.cancel();
      }
    });
  }

  saveEditAddress() {
    const { alias, telefono, pais, codigoPostal, nombrePersona, colonia, calleNumero, ciudad, correoElectronico, referencia, estado } = this.form.value;
    const forSave: Address = {
      alias: alias!,
      telefono: +telefono!,
      nombrePersona: nombrePersona!,
      pais: +pais!,
      codigoPostal: codigoPostal!,
      calleNumero: calleNumero!,
      referencia: referencia!,
      correoElectronico: correoElectronico!,
      ciudad: ciudad!,
      colonia: colonia!,
      estado: estado!,
    }
    if (this.idAddress === 0) {
      this._addressService.saveAddress(forSave).pipe(takeUntil(this.unsubcribe$)).subscribe((data: Address) => {
        if (!!data) {
          SwalUtils.timeModal(EModalMessage.saved, EIconType.success);
          this._router.navigate([`/home/address`]);
        } else {
          SwalUtils.timeModal(EModalMessage.error, EIconType.error);
        }
      });;
    } else {
      debugger;
      if (this.isEdit) {
        forSave.id = this.idAddress;
      }
      this._addressService.editAddress(forSave, this.idAddress).pipe(takeUntil(this.unsubcribe$)).subscribe((data: Address) => {
        if (!!data) {
          SwalUtils.timeModal(EModalMessage.edited, EIconType.success);
          this._router.navigate([`/home/address`]);
        } else {
          SwalUtils.timeModal(EModalMessage.error, EIconType.error);
        }
      });;
    }
  }

  searchAddressId(id: number): void {
    this._addressService.getOneAddress(id).pipe(takeUntil(this.unsubcribe$)).subscribe((data: Address) => {
      if (!!data) this.form.patchValue(data);
    });
  }

  cancel(): void {
    this._router.navigate([`/home/address`], { queryParams: this.params });
  }

  editActivate(): void {
    this.isEditActivate = !this.isEditActivate;
    this.form.enable();
  }

}

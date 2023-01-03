import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { EIconType } from 'src/app/core/enum/iconType.enum';
import { EModalMessage } from 'src/app/core/enum/modalMessage.enum';
import { ObjPage, pageDefault } from 'src/app/core/interfaces/base/objPage.interface';
import { SwalAlert } from 'src/app/core/interfaces/generales/swalAltert.interface';
import { Address } from 'src/app/core/interfaces/processes/address.interface';
import { FileUtils } from 'src/app/core/utils/file-utils';
import { SwalUtils } from 'src/app/core/utils/swal-util';
import { homeActions } from 'src/app/state/actions';
import { HomePageState, selectAddress } from 'src/app/state/reducers/home.reducers';
import { AddressService } from '../../services/address.service';

@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.scss']
})
export class ListAddressComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['alias', 'calleNumero', 'colonia', 'ciudad', 'pais', 'estado', 'actions'];

  dataSource = new MatTableDataSource<Address>([]);


  private _addressService = inject(AddressService);
  private _router = inject(Router);
  private route = inject(ActivatedRoute);

  private unsubcribe$ = new Subject<void>();
  objPage: ObjPage = pageDefault;
  isLoading = false;

  form = new FormGroup({
    filtro: new FormControl('')
  });

  address$: Observable<Address[]> | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private store: Store<HomePageState>) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.unsubcribe$)).subscribe((query) => {
      this.objPage.param = query['param'] || '';
      this.objPage.sizeTable = query['limit'] ? query['limit'] : this.objPage.sizeTable;
      this.objPage.pageNumber = query['page'] ? query['page'] : this.objPage.pageNumber;
      this.getAllAddress();
    });
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  getAllAddress(filtro: string = "", downloadExcel = false): void {
    this.isLoading = true;
    this.address$ = this.store.select(selectAddress).pipe(map(data => {
      this.dataSource = new MatTableDataSource<Address>(data);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
      if (downloadExcel) {
        FileUtils.downloadExcel(data, "Direcciones");
      }
      return data;
    }
    ));;
    this.store.dispatch(homeActions.addressRequested({ criteria: filtro }));
  }

  downloadExcel(): void {
    this.getAllAddress("", true);
  }




  confirmSelectDelete(id: number) {
    const title = EModalMessage.deleteConfirmation;
    SwalUtils.getTemplateQuention(title).then((result: SwalAlert) => {
      if (result.value) {
        this.deleteAddress(id);
      }
    });
  }

  deleteAddress(id: number): void {
    this._addressService.deleteAddress(id).pipe(takeUntil(this.unsubcribe$)).subscribe((data: Address) => {
      if (!!data) {
        SwalUtils.timeModal(EModalMessage.deleted, EIconType.success);
        this.getAllAddress();
      } else {
        SwalUtils.timeModal(EModalMessage.error, EIconType.error);
      }
    });;
  }

  editAddress(id: number): void {
    this._router.navigate([`/home/address/edit/${id}`], { queryParams: this.getQueryParams() });
  }

  pageEvent(pageIndex: PageEvent) {
    this.objPage.pageNumber = pageIndex.pageIndex;
    this.objPage.sizeTable = this.paginator.pageSize;
    this.getAllAddress();
  }

  getQueryParams() {
    return {
      ...(this.objPage.param) && { param: this.objPage.param },
      ...(this.objPage.sizeTable) && { limit: this.objPage.sizeTable },
      ...(this.objPage.pageNumber) && { page: this.objPage.pageNumber },
    };
  }

  searchUsingFilter() {
    const { filtro } = this.form.value;
    this.getAllAddress(filtro || "");
  }


}

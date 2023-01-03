import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule, routes } from './address-routing.module';
import { AddressComponent } from './address.component';
import { CoreModule } from 'src/app/core/core.module';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ListAddressComponent } from './components/address-list/list-address.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddressService } from './services/address.service';


@NgModule({
  declarations: [
    AddressComponent,
    AddAddressComponent,
    ListAddressComponent
  ],
  imports: [
    CommonModule,
    AddressRoutingModule,
    RouterModule.forChild(routes),
    CoreModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
  ],
  providers: [
    AddressService
  ],
})
export class addressModule { }

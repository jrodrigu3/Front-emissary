import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { AddressComponent } from './address.component';


export const routes: Routes = [
  {
    path: '',
    component: AddressComponent,
  },
  {
    path: 'add',
    component: AddAddressComponent,
  },
  {
    path: 'edit/:id',
    component: AddAddressComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }

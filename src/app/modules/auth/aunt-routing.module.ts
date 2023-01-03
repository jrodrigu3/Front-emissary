import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuntComponent } from './aunt.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AuntComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuntRoutingModule { }

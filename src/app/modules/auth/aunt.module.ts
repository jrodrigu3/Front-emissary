import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuntRoutingModule } from './aunt-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { AuntComponent } from './aunt.component';


@NgModule({
  declarations: [
    LoginComponent,
    AuntComponent
  ],
  imports: [
    CommonModule,
    AuntRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    TranslateModule,
  ],
  providers: [
  ]
})
export class AuntModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { BaseComponent } from './components/base/base.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    BaseComponent,
    SidebarComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    TranslateModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }

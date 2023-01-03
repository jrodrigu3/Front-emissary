import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaxCharaptersPipe } from './pipes/max-charapters.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    MaxCharaptersPipe,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    TranslateModule,
  ],
  exports: [
    MaxCharaptersPipe,
    SpinnerComponent,
  ]
})
export class SharedModule { }

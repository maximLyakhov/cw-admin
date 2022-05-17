import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewersListComponent} from "@cmp/viewers-list/viewers-list.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SvgIconModule} from "@core/svg-icon/svg-icon.module";

@NgModule({
  declarations: [
    ViewersListComponent
  ],
  imports: [
    CommonModule,
    SvgIconModule,
    ReactiveFormsModule
  ],
  exports: [
    ViewersListComponent
  ]
})
export class ViewersListModule {
}

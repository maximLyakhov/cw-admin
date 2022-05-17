import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BadgeComponent} from "@cmp/badge/badge.component";

@NgModule({
  declarations: [
    BadgeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BadgeComponent
  ]
})
export class BadgeModule {
}

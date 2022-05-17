import {NgModule} from '@angular/core';
import {Ng2SmartTableModule} from "ng2-smart-table";
import {SmartTableComponent} from "@cmp/smart-table/smart-table.component";

@NgModule({
  declarations: [
    SmartTableComponent
  ],
  imports: [
    Ng2SmartTableModule
  ],
  exports: [
    SmartTableComponent
  ]
})
export class SmartTableModule {
}

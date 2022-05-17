import {NgModule} from '@angular/core';
import {RangePickerComponent} from "@cmp/range-picker/range-picker.component";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";

@NgModule({
    declarations: [
        RangePickerComponent
    ],
    imports: [
        NgxDaterangepickerMd.forRoot()
    ],
    exports: [
        RangePickerComponent
    ]
})
export class RangePickerModule {
}

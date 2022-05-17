import {NgModule} from '@angular/core';
import {DatePickerComponent} from "@cmp/date-picker/date-picker.component";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
		declarations: [
				DatePickerComponent
		],
		imports: [
				ReactiveFormsModule,
				NgxDaterangepickerMd.forRoot()
		],
		exports: [
				DatePickerComponent
		]
})
export class DatePickerModule {
}

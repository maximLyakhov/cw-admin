import {NgModule} from '@angular/core';
import {CreateRoutingModule} from './create-routing.module';
import {CreateComponent} from './create.component';
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {CommonModule} from "@angular/common";
import {StepperModule} from "./stepper/stepper.module";
import {ButtonModule} from "@core/button/button.module";
import {ReactiveFormsModule} from "@angular/forms";
import {InputModule} from "@core/input/input.module";
import {CheckboxModule} from "@cmp/checkbox/checkbox.module";
import {ViewersListModule} from "@cmp/viewers-list/viewers-list.module";
import {TextareaModule} from "@cmp/textarea/textarea.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {TimezoneSelectorModule} from "@core/timezone-selector/timezone-selector.module";
import {DatePickerModule} from "@cmp/date-picker/date-picker.module";

@NgModule({
    declarations: [
        CreateComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputModule,
        CheckboxModule,
        TextareaModule,
        NgSelectModule,
        TimezoneSelectorModule,
        DatePickerModule,
        ViewersListModule,
        StepperModule,
        CreateRoutingModule,
        ButtonModule,
        NgxDaterangepickerMd.forRoot()
    ]
})
export class CreateModule {
}

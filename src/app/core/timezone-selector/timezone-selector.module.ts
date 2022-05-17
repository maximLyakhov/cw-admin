import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimezoneSelectorComponent} from "@core/timezone-selector/timezone-selector.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        TimezoneSelectorComponent
    ],
    imports: [
        CommonModule,
        NgSelectModule,
        ReactiveFormsModule
    ],
    exports: [
        TimezoneSelectorComponent
    ]
})
export class TimezoneSelectorModule {
}

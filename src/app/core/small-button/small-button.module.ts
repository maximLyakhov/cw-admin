import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SmallButtonComponent} from "@core/small-button/small-button.component";
import {SvgIconModule} from "@core/svg-icon/svg-icon.module";

@NgModule({
    declarations: [
        SmallButtonComponent
    ],
    imports: [
        CommonModule,
        SvgIconModule
    ],
    exports: [
        SmallButtonComponent
    ]
})
export class SmallButtonModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from "@core/button/button.component";
import {SvgIconModule} from "@core/svg-icon/svg-icon.module";

@NgModule({
    declarations: [
        ButtonComponent
    ],
    imports: [
        CommonModule,
        SvgIconModule
    ],
    exports: [
        ButtonComponent
    ]
})
export class ButtonModule {
}

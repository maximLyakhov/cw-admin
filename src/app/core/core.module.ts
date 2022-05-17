import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SvgIconModule} from "@core/svg-icon/svg-icon.module";
import {SmallButtonModule} from "@core/small-button/small-button.module";
import {ButtonModule} from "@core/button/button.module";
import {FooterModule} from "@core/footer/footer.module";
import {HeaderModule} from "@core/header/header.module";
import {InputModule} from "@core/input/input.module";
import {TimezoneSelectorModule} from "@core/timezone-selector/timezone-selector.module";
import {LayoutsModule} from "@core/layouts/layouts.module";

const modules = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SvgIconModule,
    SmallButtonModule,
    InputModule,
    ButtonModule,
    FooterModule,
    HeaderModule,
    TimezoneSelectorModule,
    LayoutsModule
]

@NgModule({
    imports: [...modules],
    exports: [...modules]
})
export class CoreModule {
}

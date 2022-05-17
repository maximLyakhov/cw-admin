import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from "@core/footer/footer.component";
import {ErrorComponent} from "@core/footer/error/error.component";

@NgModule({
    declarations: [
        FooterComponent,
        ErrorComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FooterComponent,
        ErrorComponent
    ]
})
export class FooterModule {
}

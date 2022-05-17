import {NgModule} from '@angular/core';
import {ButtonHeaderComponent} from "@core/layouts/button-header/button-header.component";
import {CardComponent} from "@core/layouts/card/card.component";
import {PageTopComponent} from "@core/layouts/page-top/page-top.component";

@NgModule({
    declarations: [
        ButtonHeaderComponent,
        CardComponent,
        PageTopComponent
    ],
    exports: [
        ButtonHeaderComponent,
        CardComponent,
        PageTopComponent
    ]
})
export class LayoutsModule {
}

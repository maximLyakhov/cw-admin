import {NgModule} from '@angular/core';
import {LoaderComponent} from "@cmp/loader/loader.component";

@NgModule({
    declarations: [
        LoaderComponent
    ],
    exports: [
        LoaderComponent
    ]
})
export class LoaderModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdjustTimePipe} from "@pipes/adjust-time.pipe";

@NgModule({
    declarations: [
        AdjustTimePipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AdjustTimePipe
    ]
})
export class PipesModule {
}

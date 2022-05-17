import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StepperComponent} from "./stepper.component";
import {CdkStepper, CdkStepperModule} from "@angular/cdk/stepper";

@NgModule({
    declarations: [
        StepperComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        StepperComponent,
        CdkStepperModule
    ],
    providers: [
        CdkStepper
    ],
})
export class StepperModule {
}

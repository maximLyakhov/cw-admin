import {NgModule} from '@angular/core';
import {UpdateRoutingModule} from './update-routing.module';
import {UpdateComponent} from './update.component';
import {SmallButtonModule} from "@core/small-button/small-button.module";
import {InputModule} from "@core/input/input.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TextareaModule} from "@cmp/textarea/textarea.module";
import {CheckboxModule} from "@cmp/checkbox/checkbox.module";
import {ViewersListModule} from "@cmp/viewers-list/viewers-list.module";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        UpdateComponent
    ],
    imports: [
        CommonModule,
        UpdateRoutingModule,
        SmallButtonModule,
        InputModule,
        ReactiveFormsModule,
        TextareaModule,
        CheckboxModule,
        ViewersListModule
    ]
})
export class UpdateModule {
}

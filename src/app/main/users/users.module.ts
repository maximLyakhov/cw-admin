import {NgModule} from '@angular/core';
import {UsersPageComponent} from './users-page.component';
import {RolePipe} from './role.pipe';
import {NewUserPageComponent} from './new-user-page/new-user-page.component';
import {EditUserPageComponent} from './edit-user-page/edit-user-page.component';
import {UserFormComponent} from './user-form/user-form.component';
import {
    UsersEditButtonComponent
} from './users-table/users-table-actions/users-edit-button/users-edit-button.component';
import {
    UsersTableActionsComponent
} from './users-table/users-table-actions/users-table-actions.component';
import {UsersRoleComponent} from './users-table/users-role/users-role.component';
import {CoreModule} from "@core/core.module";
import {SmartTableModule} from "@cmp/smart-table/smart-table.module";
import {BadgeModule} from "@cmp/badge/badge.module";
import {CheckboxModule} from "@cmp/checkbox/checkbox.module";
import {UsersRoutingModule} from "./users-routing.module";

@NgModule({
    declarations: [
        UsersPageComponent,
        RolePipe,
        NewUserPageComponent,
        EditUserPageComponent,
        UserFormComponent,
        UsersEditButtonComponent,
        UsersTableActionsComponent,
        UsersRoleComponent
    ],
    imports: [
        CoreModule,
        SmartTableModule,
        UsersRoutingModule,
        BadgeModule,
        CheckboxModule
    ]
})
export class UsersModule {
}

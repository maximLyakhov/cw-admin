import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "@core/header/header.component";
import {MenuComponent} from "@core/header/menu/menu.component";
import {UserInfoComponent} from "@core/header/user-info/user-info.component";
import {SmallButtonModule} from "@core/small-button/small-button.module";
import {RouterModule} from "@angular/router";
import {BreadcrumbsComponent} from "@core/header/breadcrumbs/breadcrumbs.component";
import {SvgIconModule} from "@core/svg-icon/svg-icon.module";

@NgModule({
    declarations: [
        HeaderComponent,
        MenuComponent,
        UserInfoComponent,
        BreadcrumbsComponent
    ],
    imports: [
        CommonModule,
        SvgIconModule,
        SmallButtonModule,
        RouterModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule {
}

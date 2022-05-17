import {NgModule} from '@angular/core';
import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {LoginComponent} from '../shell/login/login.component';
import {LoginFormComponent} from '../shell/login/login-form/login-form.component';
import {CoreModule} from "@core/core.module";

@NgModule({
	declarations: [
		MainComponent,
		LoginComponent,
		LoginFormComponent
	],
	imports: [
		CoreModule,
		MainRoutingModule
	]
})
export class MainModule {
}

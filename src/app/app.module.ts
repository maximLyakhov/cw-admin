import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatSnackBarModule,} from '@angular/material/snack-bar';
import {providers} from "./app.providers";
import {state} from "./app.state";
import {RouterModule} from "@angular/router";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";

@NgModule({
		declarations: [
				AppComponent
		],
		imports: [
				...state,
				BrowserModule,
				AppRoutingModule,
				BrowserAnimationsModule,
				OverlayModule,
				MatSnackBarModule,
				RouterModule,
				NgxDaterangepickerMd.forRoot()
		],
		providers,
		bootstrap: [AppComponent]
})
export class AppModule {
}

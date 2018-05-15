import {APP_BASE_HREF} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {MaterialModule} from './material/material.module';
import {StoreModule} from '@ngrx/store';
import {V1BackendModule} from "@blueriq/angular/backend/v1";
import {BlueriqModule} from '@blueriq/angular';
import {EffectsModule} from '@ngrx/effects';

// const COMPONENTS = [
//   PageComponent
// ]

@NgModule({
  declarations: [
    AppComponent
    // COMPONENTS
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    BlueriqModule.forRoot(),
    V1BackendModule.forRoot({
      baseUrl: '/Runtime',
    }),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    // BlueriqComponents.register(COMPONENTS)
    {provide: APP_BASE_HREF, useValue: (window as any)['_app_base'] || '/'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

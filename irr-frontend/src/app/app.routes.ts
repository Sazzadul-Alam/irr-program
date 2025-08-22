import {RouterModule, Routes} from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HomeComponent} from "./home/home/home.component";

// Export the routes
export const routes: Routes = [
  { path: 'Irr-program/ms6ct/admin', component: AdminComponent },
  { path: '', component:HomeComponent},
  { path: '**', component:HomeComponent}
];

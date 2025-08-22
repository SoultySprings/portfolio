import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
// import { AppComponent } from './app.component';

bootstrapApplication(App, appConfig,)
  .catch((err) => console.error(err));



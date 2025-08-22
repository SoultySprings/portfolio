import { Component, NgModule } from '@angular/core';
import { Portfolio } from "./portfolio/portfolio";
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule,
    HttpClientModule, Portfolio],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  number = 0
  inc(){
    this.number = this.number+1
  }
}

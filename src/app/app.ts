import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Info } from "./info/info";

@Component({
  selector: 'app-root',
  imports: [Info],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  number = 0
  inc(){
    this.number = this.number+1
  }
}

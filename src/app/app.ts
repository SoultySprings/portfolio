import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Info } from "./info/info";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Info],
})
export class App {
}

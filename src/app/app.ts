import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pro } from "./pro/pro";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Pro],
})
export class App {
  title = 'rmndls';
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.html',
  styleUrl: './info.css'
})
export class Info {
  display = true
  willdisProjs(){
    this.display = !this.display
    console.log('This button has been clicked!')
  }
}

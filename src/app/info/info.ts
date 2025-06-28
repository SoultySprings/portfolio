import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.html',
  styleUrl: './info.css'
})
export class Info {
  dispProjs = false
  dispContact = false
  dispAbout = false
  willdisProjs(){
    this.dispProjs = !this.dispProjs
  }
  willdisCont(){
    this.dispContact = !this.dispContact
  }
  willdisAbout(){
    this.dispAbout = !this.dispAbout
  }
}

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
  dispResume = false
  willdisRes(){
    this.dispProjs = false
    this.dispAbout = false
    this.dispContact = false
    this.dispResume = !this.dispResume
  }
  willdisProjs(){
    this.dispResume = false
    this.dispContact = false
    this.dispProjs = !this.dispProjs
    this.dispAbout = false
  }
  willdisCont(){
    this.dispResume = false
    this.dispProjs = false
    this.dispContact = !this.dispContact
    this.dispAbout = false
  }
  willdisAbout(){
    this.dispResume = false
    this.dispContact = false
    this.dispAbout = !this.dispAbout
    this.dispProjs = false
  }
}

import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';      
import { isPlatformBrowser } from '@angular/common';

@Component({
    standalone: true,
  selector: 'app-info',
  imports: [CommonModule],
  templateUrl: './info.html',
  styleUrls: ['./info.css'] 
})
export class Info {

  dispHome = true
  dispProjs = false
  dispContact = false
  dispAbout = false
  dispResume = false
  willdisHome(){
    this.dispHome = true
    this.dispResume = false 
    this.dispProjs = false
    this.dispAbout = false
    this.dispContact = false
  }
  willdisRes(){
    this.dispHome = false
    this.dispProjs = false
    this.dispAbout = false
    this.dispContact = false
    this.dispResume = !this.dispResume
  }
  willdisProjs(){
    this.dispHome = false
    this.dispResume = false
    this.dispContact = false
    this.dispProjs = true
    this.dispAbout = false
  }
  willdisCont(){
    this.dispHome = false
    this.dispResume = false
    this.dispProjs = false
    this.dispContact = true
    this.dispAbout = false
  }
  willdisAbout(){
    this.dispHome = false
    this.dispResume = false
    this.dispContact = false
    this.dispAbout = true
    this.dispProjs = false
  }
}

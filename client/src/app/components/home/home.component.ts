import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  today: any
  showDialog = false;

  ngOnInit(){
    this.today = new Date().toISOString().split('T')[0];
  }

  constructor() {
  }
  goTo(location: string):void{
    window.location.hash=location;
  }
}

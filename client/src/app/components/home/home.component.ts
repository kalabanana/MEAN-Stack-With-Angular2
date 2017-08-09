import { Component, OnInit } from '@angular/core';
import { SelectComponent} from "../select/select.component";
import { EntercodeComponent} from "../confirmation/entercode/entercode.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  today: any

  ngOnInit(){
    this.today = new Date().toISOString().split('T')[0];
  }

  constructor() {
  }

  onSubmit(){
    console.log('submit');
  }
}

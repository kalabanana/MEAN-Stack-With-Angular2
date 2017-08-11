import { Component, OnInit } from '@angular/core';
import { SelectComponent} from "../select/select.component";
import { EntercodeComponent} from "../confirmation/modal/modal.component";
import { ReserveFormComponent} from "../reserve-form/reserve-form.component"

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

import {Component, Input, OnInit} from '@angular/core';
import { CustomerModel } from "../customer-list.model"

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @Input() customer: CustomerModel

  constructor() { }

  ngOnInit() {
  }

}

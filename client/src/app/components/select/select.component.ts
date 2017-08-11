import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  SelectedValue: String = null;
  constructor() { }

  ngOnInit(){
  }
  people: any[] =[
    {id:1, name:'1 person'},
    {id:2, name:'2 people'},
    {id:3, name:'3 people'},
    {id:4, name:'4 people'},
    {id:5, name:'5 people'},
    {id:6, name:'6 people'},
    {id:7, name:'7 people'},
    {id:8, name:'8 people'},
    {id:9, name:'9 people'},
    {id:10, name:'10 people'},
    {id:11, name:'11 people'},
    {id:12, name:'12 people'},
    {id:13, name:'13 people'},
    {id:14, name:'14 people'},
    {id:15, name:'15 people'},
    {id:16, name:'16 and up'},

  ]

  getSelectedValue(){
    console.log(this.SelectedValue);
  }

}

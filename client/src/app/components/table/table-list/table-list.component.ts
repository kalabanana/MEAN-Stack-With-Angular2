import { Component, OnInit } from '@angular/core';
import { TableModel } from "./table.model"
import { BookService } from "../../../services/book.service"
import * as moment from 'moment';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  tables: Map <String, TableModel>;
  tableList: any;
  bookingList: any;
  message;
  messageClass;
  today;
  tomorrow;
  date: any;
  isToday = true;
  isTomorrow = false;
  isAll = false;
  loading;
  showDialog = true;
  showDialog1 = false;

  selectedTable: TableModel;


  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.showDialog1 = false;
    this.loading = true;
    this.today = (new Date());
    this.tomorrow = (new Date(this.today.getTime() + 86400*1000));
    this.getTodayReservation();
    this.isToday = true;
    this.isTomorrow =false;
    this.isAll = false;
  }

  allTables(){
    this.bookService.getAllReservations().subscribe(data =>{
      if(!data.success){
        this.messageClass = 'alert alert-danger'
        this.message = data.message;
      }else {
        this.bookingList = Array.from(data.bookings);
        this.tables = new Map <String, TableModel>();
        this.bookingList.map(booking => {
            if(this.tables.has(booking.tableId)){
              this.tables.get(booking.tableId).pastBookings.push(booking)
            }else {
              const table = new TableModel(booking.tableId,booking._id)
              table.pastBookings.push(booking);
              this.tables.set(booking.tableId, table);
            }
        })
        this.loading = true;
        this.tableList = Array.from(this.tables.values())
        this.isToday = false;
        this.isTomorrow =false;
        this.isAll = true;
      }
    })
  }
  getTomorrowReservation(){
    this.bookService.getAllReservations().subscribe(data =>{
      this.bookingList = Array.from(data.bookings);
      this.tables = new Map <String, TableModel>();

      this.bookingList.map(booking =>{
        if( (new Date(booking.startTime)).getDate() === this.tomorrow.getDate()){
          if(this.tables.has(booking.tableId)){
            this.tables.get(booking.tableId).pastBookings.push(booking)
          }else {
            const table = new TableModel(booking.tableId, booking._id)
            table.pastBookings.push(booking);
            this.tables.set(booking.tableId, table);
          }
        }
        this.tableList = Array.from(this.tables.values());
        this.isToday =false;
        this.isTomorrow =true;
        this.isAll = false;
        this.loading = true;

      })
    })
  }

  getTodayReservation(){
    this.bookService.getAllReservations().subscribe(data =>{
      this.tables = new Map <String, TableModel>();
      this.bookingList = Array.from(data.bookings);
      this.bookingList.map(booking =>{
        if( (new Date(booking.startTime)).getDate() === this.today.getDate()){
          if(this.tables.has(booking.tableId)){
            this.tables.get(booking.tableId).pastBookings.push(booking)
          }else {
            const table = new TableModel(booking.tableId, booking._id)
            table.pastBookings.push(booking);
            this.tables.set(booking.tableId, table);
          }
        }
        this.tableList = Array.from(this.tables.values());
        this.isToday =true;
        this.isTomorrow = false;
        this.isAll = false;
        this.loading = true;
        //console.log(this.tableList);

      })
    })
  }

  onSelect(table: TableModel): void{
    this.showDialog = true;
    this.selectedTable = table;
    console.log(this.selectedTable);
  }
}

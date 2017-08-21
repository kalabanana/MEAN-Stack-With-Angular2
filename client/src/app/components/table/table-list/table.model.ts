export class TableModel {
  tableId: Number;
  name: String;
  telephone: String;
  startTime: Number;
  endTime: Number;
  totalTable: Number;
  _id;
  pastBookings: Array<Object>;

  constructor (tableId: Number, _id:String ){
    this.tableId = tableId;
    this._id = _id;
    this.totalTable =20;
    this.pastBookings = [];

  }
}

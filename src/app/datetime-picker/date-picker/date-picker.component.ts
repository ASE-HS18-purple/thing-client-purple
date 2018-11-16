import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  date;
  @Output() dateChanged = new EventEmitter();

  constructor() {
    this.date = {year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDay()};
    this.handleDate();
  }

  ngOnInit() {
  }

  handleDate() {
    console.log('Initially emitted thi = ', this.date);
    const dateAsDateType: Date = new Date(this.date);
    this.dateChanged.emit(dateAsDateType);
  }

}

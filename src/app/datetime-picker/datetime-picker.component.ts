import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.css']
})
export class DatetimePickerComponent implements OnInit {

  @Output() dateChanged = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  handleDateChanged($event) {
    console.log('Then emitted this: ', event);
    this.dateChanged.emit(event);
  }

}

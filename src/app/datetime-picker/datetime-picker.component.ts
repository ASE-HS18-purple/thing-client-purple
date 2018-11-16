import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbDateStruct} from '../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.css']
})
export class DatetimePickerComponent implements OnInit {
  date: NgbDateStruct;
  time;

  @Output() dateChanged = new EventEmitter();
  @Output() timeChanged = new EventEmitter();

  @Input() initialDate: Date;
  @Input() initialTime: Date;

  constructor() {
  }

  ngOnInit() {
    if (this.initialDate) {
      this.date = {
        year: this.initialDate.getFullYear(),
        month: this.initialDate.getMonth(),
        day: this.initialDate.getDate()
      };
    }
    if (this.initialTime) {
      this.time = {
        hour: this.initialTime.getHours(),
        minute: this.initialTime.getUTCMinutes(),
      };
    }
  }

  handleDate($event) {
    this.date = $event;
    this.dateChanged.emit($event);
  }

  handleTime($event) {
    this.time = event;
    this.timeChanged.emit($event);
  }

}

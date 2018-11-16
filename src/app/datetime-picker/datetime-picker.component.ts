import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbDateStruct} from '../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.css']
})
export class DatetimePickerComponent implements OnInit {
  date: NgbDateStruct;
  @Output() dateChanged = new EventEmitter();
  @Input() initialDate: Date;

  constructor() {
  }

  ngOnInit() {
    console.log('Initial set date = ', this.initialDate);
    if (this.initialDate) {
      this.date = {
        year: this.initialDate.getFullYear(),
        month: this.initialDate.getMonth(),
        day: this.initialDate.getDate()
      };
    }
  }

  handleDate($event) {
    console.log('At the start emitted this = ', $event);
    this.dateChanged.emit($event);
  }

}

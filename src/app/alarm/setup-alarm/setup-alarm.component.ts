import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AlarmService} from '../../service/alarm.service';
import {AlarmModel} from '../../model/alarm.model';

@Component({
  selector: 'app-setup-alarm',
  templateUrl: './setup-alarm.component.html',
  styleUrls: ['./setup-alarm.component.css']
})
export class SetupAlarmComponent implements OnInit {

  form: FormGroup;
  formBuilder: FormBuilder;
  contactingServer = false;
  time: { hour: number, minute: number, second: number };
  message: string;
  error: boolean;
  @Output() reloadData: EventEmitter<void> = new EventEmitter();

  constructor(public alarmService: AlarmService,
              public activeModal: NgbActiveModal,
              fb: FormBuilder) {
    this.formBuilder = fb;
    const now = new Date();
    this.time = {hour: now.getHours(), minute: now.getMinutes(), second: now.getSeconds()};
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  configureAlarm() {
    let validForm = true;
    let validTime = true;
    const now = new Date();
    const hoursNow = now.getHours();
    const minutesNow = now.getMinutes();
    validTime = (this.time.hour === hoursNow && this.time.minute > minutesNow) ||
      (this.time.hour > hoursNow);
    if (validTime) {
      Object.keys(this.form.controls).forEach(controlName => {
        const control = this.form.get(controlName);
        if (!control.valid) {
          validForm = false;
        }
      });
      if (validForm) {
        // setup the alarm.
        const alarm: AlarmModel = new AlarmModel();
        const data = this.form.value;
        alarm.name = data.name;
        const date = new Date();
        date.setHours(this.time.hour, this.time.minute, 0);
        alarm.triggerTime = date.getTime();
        console.log(date);
        console.log(this.time);
        console.log(alarm);
        this.alarmService.setupAlarm(alarm).subscribe((alarmResponse: AlarmModel) => {
          this.activeModal.close('');
          this.reloadData.emit();
        });
      }
    } else {
      this.message = 'Is the alarm setup in the future?';
      this.error = true;
    }
  }

  handleTime($event: any) {
    this.time = $event;
    console.log($event);
  }

}

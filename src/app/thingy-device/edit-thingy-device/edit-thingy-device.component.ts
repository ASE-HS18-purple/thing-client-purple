import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ThingyDeviceService} from '../../service/thingy-device.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ThingyDeviceModel} from '../../model/thingy-device.model';

@Component({
  selector: 'app-edit-thingy-device',
  templateUrl: './edit-thingy-device.component.html',
  styleUrls: ['./edit-thingy-device.component.css']
})
export class EditThingyDeviceComponent implements OnInit {

  @Input() id: string;
  form: FormGroup;
  formBuilder: FormBuilder;
  contactingServer = false;
  message: string;
  error: boolean;
  @Output() reloadData: EventEmitter<void> = new EventEmitter();

  constructor(public thingyDeviceService: ThingyDeviceService,
              public activeModal: NgbActiveModal,
              fb: FormBuilder) {
    this.formBuilder = fb;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.resetForm();
    this.contactingServer = true;
    this.thingyDeviceService.findThingyDeviceById(this.id).subscribe((res: ThingyDeviceModel) => {
      this.contactingServer = false;
      this.form = this.formBuilder.group({
        deviceId: new FormControl(res.deviceId, [
          Validators.required,
          Validators.minLength(5),
        ]),
        name: new FormControl(res.name, [
          Validators.required,
          Validators.minLength(5),
        ]),
        location: new FormControl(res.location, [
          Validators.required,
          Validators.minLength(3),
        ]),
      });
    }, error => {
      this.message = 'Failed to retrieve the latest version of thingy device';
      this.error = true;
      console.log('Error occurred..');
      this.contactingServer = false;
    });
  }

  private resetForm() {
    this.form = this.formBuilder.group({
      deviceId: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      location: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ])
    });
  }

  updateThingyDevice() {
    let validForm = true;
    Object.keys(this.form.controls).forEach(controlName => {
      const control = this.form.get(controlName);
      if (!control.valid) {
        validForm = false;
      }
    });
    if (validForm) {
      const thingyDeviceModel: ThingyDeviceModel = new ThingyDeviceModel();
      const data = this.form.value;
      thingyDeviceModel.deviceId = data.deviceId;
      thingyDeviceModel.location = data.location;
      thingyDeviceModel.name = data.name;
      thingyDeviceModel.id = this.id;
      this.thingyDeviceService.updateThingDevice(thingyDeviceModel).subscribe(() => {
        this.activeModal.close('');
        this.reloadData.emit();
      }, error => {
        this.error = true;
        this.message = 'The name and the device id must be unique!';
      });
    }
  }

}

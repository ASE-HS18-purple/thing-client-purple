import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ThingyDeviceService} from '../../service/thingy-device.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ThingyDeviceModel} from '../../model/thingy-device.model';

@Component({
  selector: 'app-thingy-device',
  templateUrl: './configure-thingy-device.component.html',
  styleUrls: ['./configure-thingy-device.component.css']
})
export class ConfigureThingyDeviceComponent implements OnInit {

  form: FormGroup;
  formBuilder: FormBuilder;
  contactingServer = false;
  message: string;
  error: boolean;
  @Output() reloadTable: EventEmitter<void> = new EventEmitter<void>();

  constructor(public thingyDeviceService: ThingyDeviceService,
              public activeModal: NgbActiveModal,
              fb: FormBuilder) {
    this.formBuilder = fb;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      location: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      deviceId: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ])
    });
  }

  configureThingyDevice() {
    let validForm = true;
    Object.keys(this.form.controls).forEach(controlName => {
      const control = this.form.get(controlName);
      if (!control.valid) {
        validForm = false;
      }
    });
    if (validForm) {
      this.contactingServer = true;
      const formData = this.form.value;
      const thingyDevice: ThingyDeviceModel = new ThingyDeviceModel();
      thingyDevice.deviceId = formData.deviceId;
      thingyDevice.name = formData.name;
      thingyDevice.location = formData.location;
      this.thingyDeviceService.configureThingyDevice(thingyDevice).subscribe((response: ThingyDeviceModel) => {
        if (response) {
          this.contactingServer = false;
          this.activeModal.close('Close click');
          this.reloadTable.emit();
        } else {
          this.error = true;
          this.message = 'Name or device id are not unique. They must be unique.';
          this.contactingServer = false;
        }
      });
    }
  }

}

import { PopoverController, ModalController } from 'ionic-angular';
import { ProdutoService } from './../../providers/database/services/produto';
import { Component, Input, OnChanges, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormControl } from '@angular/forms';
import { Produto } from '../../providers/database/models/produto';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'select-photo',
  templateUrl: 'select-photo.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectPhotoComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => SelectPhotoComponent), multi: true }
  ]
})

export class SelectPhotoComponent implements ControlValueAccessor, OnChanges {
  modal;
  constructor(
    private modalCtrl: ModalController,
    private ng2ImgMax: Ng2ImgMaxService    
  ){
  }
  propagateChange: any = () => { };
  validateFn: any = () => { };

  @Input('value') _value = "";
  @Input('forma') _format = "";
  
  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.propagateChange(val);
  }

  ngOnChanges(inputs) {

  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  select() {
    
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }

  fileChangeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var fileInput: File = inputValue.files[0];
    this.ng2ImgMax.resizeImage(fileInput, 504, 504).subscribe(file => {
      var myReader: FileReader = new FileReader();

      myReader.onloadend = (e) => {
        this.writeValue(myReader.result);
      }
      myReader.readAsDataURL(file);
    });
  }

}

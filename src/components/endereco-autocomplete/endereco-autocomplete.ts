import { PopoverController, ModalController } from 'ionic-angular';
import { ProdutoService } from './../../providers/database/services/produto';
import { Component, Input, OnChanges, forwardRef, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormControl } from '@angular/forms';
import { Endereco } from '../../providers/database/models/shared-models';
import { GoogleApis } from '../../services/consulta-google-apis';

declare var google: any;

@Component({
  selector: 'endereco-autocomplete',
  templateUrl: 'endereco-autocomplete.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => EnderecoAutocompleteComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EnderecoAutocompleteComponent), multi: true }
  ]
})

export class EnderecoAutocompleteComponent {
  autocompleteItems: any;
  autocomplete: any;
  acService: any;
  placesService: any;

  constructor(
    public googleApis: GoogleApis
  ) {
  }
  propagateChange: any = () => { };
  validateFn: any = () => { };

  @Input('Endereco') _Endereco = 0;

  get Endereco() {
    return this._Endereco;
  }

  set Endereco(val) {
    this._Endereco = val;
    console.log('funciona');
    this.propagateChange(val);
  }

  ngOnChanges(inputs) {

  }

  writeValue(value) {
    if (value) {
      this.Endereco = value;
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

  ngOnInit() {
    this.acService = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  chooseItem(item: any) {
    console.log('modal > chooseItem > item > ', item);
    this.getPlaceDetail(item.place_id).then((endereco:Endereco) => {
      this.writeValue(endereco);
    })
  }

  updateSearch() {
    console.log('modal > updateSearch');
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let self = this;
    let config = {
      types: ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
      input: this.autocomplete.query,
      componentRestrictions: { country: 'BR' }
    }
    this.acService.getPlacePredictions(config, function (predictions, status) {
      console.log('modal > getPlacePredictions > status > ', status);
      self.autocompleteItems = [];
      if (predictions) {
        predictions.forEach(function (prediction) {
          self.autocompleteItems.push(prediction);
        });
      }
    });
  }
  private getPlaceDetail(place_id: string): Promise<Endereco> {
    return new Promise(resolve => {
      this.googleApis.geocodeingGetEndereco(place_id).subscribe(dadosGoogle => {
        console.log('googleDados ==> ',dadosGoogle);
        if (dadosGoogle.status == "OK") {
          let dados = <Endereco>{
            cep: "this.formulario.get('cep').value",
            numero: 1,
            complemento: "this.formulario.get('complemento').value",
            rua: "this.formulario.get('rua').value",
            bairro: "this.formulario.get('bairro').value",
            cidade: "this.formulario.get('cidade').value",
            estado: "this.formulario.get('estado').value",
            latitude: dadosGoogle.results[0].geometry.location.lat,
            longitude: dadosGoogle.results[0].geometry.location.lng
          }
          this.autocomplete.query = dadosGoogle.results[0].formatted_address;
          this.autocompleteItems = [];          
          resolve(dados);
        } else {
          resolve(null);
        }
      })
    })
  }
}

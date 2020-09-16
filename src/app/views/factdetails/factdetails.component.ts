import { Component,OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'factdetails.component.html'
})
export class FactdetailsComponent implements OnInit {

  data: any;
  publicTrackingForm: FormGroup;
  searchedFact:any[any]=[];
  placeholderInput:string = "Indique un nro a buscar";

  status:any[] = [
    {
      id: 0,
      nombre: 'Pendiente'
    },
    {
      id: 1,
      nombre: 'Entregado'
    }
  ]
  estados:any;
  ciudades:any;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public service: ServicesService) {
    this.createForm();
   }

  ngOnInit(){
    this.getCiudades();
    this.getEstados();
  }

  createForm() {
    this.publicTrackingForm = this.formBuilder.group({
      buscar: [0],
      inputBuscar: ["", Validators.required],
    });
  }
  
  onSubmit() {
    if (this.publicTrackingForm.valid && (this.publicTrackingForm.controls['buscar'].value == 1 || this.publicTrackingForm.controls['buscar'].value == 2)) {
      if(this.publicTrackingForm.controls['buscar'].value == 1){ //NroGuia Factura
        this.searchedFact = [];
        this.getFacturaxNroGuia();
      }
    }else {
      if(this.publicTrackingForm.controls['inputBuscar'].value == ""){
        swal("Error", `Por favor, ${this.placeholderInput}.`, "error");
      }else if(this.publicTrackingForm.controls['buscar'].value == 0){
        swal("Error", `Por favor, indique una opcion para buscar.`, "error");
      }
    }
  }

  placehold(){
    setTimeout( () => {
      if(this.publicTrackingForm.controls['buscar'].value == 1){
        this.placeholderInput = 'Indique el nro de guía a buscar';
      }
    },100);
  }

  getFacturaxNroGuia(){
    this.service.getWithoutHeader(`factura/trackingNroGuia/${this.publicTrackingForm.controls['inputBuscar'].value}`).then((result) => {
      let datta:any = result;
      if(datta){
        if(datta.message == "No existe factura asociada con ese nro de guia en la BD."){
          swal("No existe la factura", `La factura con el nro de guia ${this.publicTrackingForm.controls['inputBuscar'].value} no existe.`, "info");
        }else if(datta.length > 0){
          console.log(datta)
          let ciudad:string;
          let estado:string;
          let status:string;
          for(let i=0; i< this.estados.length; i++){
            if(this.estados[i].id == datta[0].estado){
              estado = this.estados[i].nombre;
            }
          }
          for(let i=0; i< this.ciudades.length; i++){
            if(this.ciudades[i].id == datta[0].ciudad){
              ciudad = this.ciudades[i].nombre;
            }
          }
          for(let i=0; i< this.status.length; i++){
            if(this.status[i].id == datta[0].statusfact){
              status = this.status[i].nombre;
            }
          }
          this.searchedFact = {
            nroguia: datta[0].nroguia,
            nrof: datta[0].nrof,
            remitente: datta[0].remitente,
            destinatario: datta[0].destinatario,
            fletedestino: datta[0].fletedestino,
            valor: datta[0].valor,
            estado: estado,
            ciudad: ciudad,
            fechaentrega: datta[0].fechaentrega,
            statusfact: status
          }
        }
      }
    }, (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    })
  }

  getEstados(){
    this.service.getWithoutHeader('estados').then((result) => {
      this.estados = result;
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  };

  getCiudades(){
    this.service.getWithoutHeader('ciudades').then((result) => {
      this.ciudades = result;
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  }
  
}

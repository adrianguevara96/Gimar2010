import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../../services/services.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-guiasentregas',
  templateUrl: './guiasentregas.component.html',
  styleUrls: ['./guiasentregas.component.css']
})
export class GuiasentregasComponent implements OnInit {

  guiasEntregaForm: FormGroup;

  facturas:any;
  nroGuiaCarga:any;
  mostrarTabla:boolean = false;
  mostrarForm:boolean = false;
  crearGuia:boolean = false;

  montototal:number = 0;
  rutaXCiudad:any;

  constructor(
    private formBuilder: FormBuilder,
    public service: ServicesService
  ) {
    this.createForm();
   }

  ngOnInit(): void {
  }


  createForm() {
    this.guiasEntregaForm = this.formBuilder.group({
      remitente: ["", Validators.required],
      rifremitente: ["", Validators.required],
      direccion: ["", Validators.required],

      destinatario: ["", Validators.required],
      rifdestinatario: ["", Validators.required],
      direcciondespacho: ["", Validators.required],
      
      bultos: ["", Validators.required],
      fletedestino: ["", Validators.required],
      monto: ["", Validators.required],
      montoflete: ["", Validators.required],
      observacion: [""],
    });
  }

  onSubmit() {
    if (this.guiasEntregaForm.valid) {
      this.crearGuiaEntrega()
    }else {
      swal("Rellenar Campos", "Por favor, rellene todos los campos.", "info");
    }
  }

  getFacturasxNroGuiaCarga(){
    if(this.nroGuiaCarga != undefined) {
      this.service.get(`facturas/guiacarga/${this.nroGuiaCarga}`).then( (result) => {
        let res:any = result;
        console.log(result);
        if(res.message == "No existen las facturas en la BD."){
          swal("No existen facturas", `La guía de carga #${this.nroGuiaCarga} no existe o no tiene facturas por entregar.`, "info");
        }else{
          this.facturas = res;
          this.mostrarTabla = true;
        }
      }, (err) => {
        swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
      })
    }else{
      swal("Rellenar Campo", "Por favor, ingrese un nro de guía de carga.", "info");
    }
  }

  agregarFormGuiaEntrega(factura:any){
    this.mostrarForm = true;
    this.mostrarTabla = false;
    //if(factura.fletedestino == 'Si'){
      this.service.get(`rutaxciudad/${factura.idruta}/${factura.idciudad}`).then( (result) => {
        let res:any = result;
        console.log("rutaxciudad: ", result);
        //this.rutaXCiudad = res;
        this.llenarFormularioGuiaEntrega(factura, res[0].porcentaje);
        this.crearGuia = true;

      }, (err) => {
        swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
      })
    /*}else{

    }*/
  }

  llenarFormularioGuiaEntrega(factura:any,porcentaje:any){
    this.guiasEntregaForm.controls['remitente'].setValue(factura.remitente);
    this.guiasEntregaForm.controls['rifremitente'].setValue(factura.rifremitente);
    this.guiasEntregaForm.controls['direccion'].setValue(factura.dirfiscal);
    this.guiasEntregaForm.controls['destinatario'].setValue(factura.destinatario);
    this.guiasEntregaForm.controls['rifdestinatario'].setValue(factura.rif);
    this.guiasEntregaForm.controls['direcciondespacho'].setValue(factura.direccion);
    this.guiasEntregaForm.controls['bultos'].setValue(factura.bultos);
    this.guiasEntregaForm.controls['fletedestino'].setValue(factura.fletedestino);
    this.guiasEntregaForm.controls['monto'].setValue(factura.valor);
    if(factura.fletedestino == 'Si'){
      let fletedestino = parseFloat(this.guiasEntregaForm.controls['monto'].value) * (porcentaje / 100);
      this.guiasEntregaForm.controls['montoflete'].setValue(fletedestino);
    }else{
      this.guiasEntregaForm.controls['montoflete'].setValue(0);
    }
    this.montototal = parseFloat(this.guiasEntregaForm.controls['montoflete'].value) + parseFloat(this.guiasEntregaForm.controls['monto'].value)
  }

  crearGuiaEntrega(){
    this.mostrarForm = false;
    this.mostrarTabla = true;
    this.crearGuia = false;
  }

}

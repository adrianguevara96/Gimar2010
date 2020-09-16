import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../../services/services.service';
import swal from 'sweetalert';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';
import * as moment from 'moment';

@Component({
  selector: 'app-guiasentregas',
  templateUrl: './guiasentregas.component.html',
  styleUrls: ['./guiasentregas.component.css']
})
export class GuiasentregasComponent implements OnInit {

  guiasEntregaForm: FormGroup;

  facturas:any;
  factura:any;
  nroGuiaCarga:any;
  mostrarTabla:boolean = false;
  mostrarForm:boolean = false;
  crearGuia:boolean = false;

  montototal:number = 0;
  rutaXCiudad:any;
  tiposIdentificacion:any;

  constructor(
    private formBuilder: FormBuilder,
    public service: ServicesService
  ) {
    this.createForm();
   }

  ngOnInit(): void {
    this.getTiposIdentificacion();
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
        if(res.message == "No existen las facturas en la BD."){
          this.facturas = [];
          this.mostrarTabla = false;
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
    this.factura = factura;
    this.mostrarForm = true;
    this.mostrarTabla = false;
    this.service.get(`rutaxciudad/${factura.idruta}/${factura.idciudad}`).then( (result) => {
      let res:any = result;
      this.llenarFormularioGuiaEntrega(factura, res[0].porcentaje);
      this.crearGuia = true;
      }, (err) => {
        swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
      })
  }

  llenarFormularioGuiaEntrega(factura:any,porcentaje:any){
    //console.log(factura);
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
    this.generarGuiaEntrega();
  }

  generarGuiaEntrega() {

    // ====================  VARIABLES DE LA GUIA DE ENTREGA  ======================
    //PRE LINEA 1
    let nrofact = this.factura.nrof;
    let bultos = this.guiasEntregaForm.controls['bultos'].value;
    let nroguia = this.factura.nroguia;
    let fecha = moment().format('L');

    // LINEA 1
    let remitente= this.guiasEntregaForm.controls['remitente'].value;
    let tipoidentificacionremitente:any;
    let tipoidentificaciondestinatario:any;
    for(let i = 0; i < this.tiposIdentificacion.length; i++){
      if(this.tiposIdentificacion[i].id == this.factura.tipoidentificacionremitente){
        tipoidentificacionremitente = this.tiposIdentificacion[i].nombre;
      }
      if(this.tiposIdentificacion[i].id == this.factura.tipoidentificacion){
        tipoidentificaciondestinatario = this.tiposIdentificacion[i].nombre;
      }
    }
    let rifremitente = `${tipoidentificacionremitente}-${this.factura.rifremitente}`;
    let montofactura = `${this.guiasEntregaForm.controls['monto'].value}`;

    // LINEA 2
    
    // LINEA 3
    let destinatario = this.factura.destinatario;
    let rifdestinatario = `${tipoidentificaciondestinatario}-${this.factura.rif}`;
    let fletedestino = `${this.factura.fletedestino}`;

    // LINEA 4
    //let direccion = this.factura.dirfiscal;
    let dirdespa = this.factura.direccion;
    let direcciondespacho = '';
    let direcciondespacho2 = '';
    if(dirdespa.length > 44){
      direcciondespacho = dirdespa.substr(0,44);
      direcciondespacho2 = dirdespa.substr(44);
    }else{
      direcciondespacho = dirdespa.substr(0);
    }
    let montofletedestino = `${this.guiasEntregaForm.controls['montoflete'].value}`;

    // LINEA 5
    let montototal = `${this.montototal}`

    // LINEA 6
    
    // LINEA 7
    let obser = this.guiasEntregaForm.controls['observacion'].value;
    let observaciones = '';
    let observaciones2 = '';
    //console.log(obser.length)
    if(obser.length > 90){
      observaciones = obser.substr(0,90);
    }
    if(obser.length > 190){
      observaciones2 = obser.substr(90);
    }else{
      observaciones2 = obser.substr(90);
    }

    //GUARDAR DOCUMENTO
    var doc = new jspdf('p','cm','letter');
    
    // ====================  TEXTO DE LA GUIA DE ENTREGA  ======================
    doc.setFontSize(12);
    // ===========================================
    //doc.text(0.5, 2,    '...............................................................2cm.........................................................');
    // ================  BODY  ===================
    //PRE LINEA 1
    doc.text(`# Factura: ${nrofact}`, 7, 2.5);
    doc.text(`# Bultos: ${bultos}`, 11, 2.5);
    doc.text(`Guia #: ${nroguia}`, 14, 2.5);
    doc.text(`Fecha: ${fecha}`, 17, 2.5);

    //LINEA 1
    doc.text(`Remitente: ${remitente}`, 0.5, 3.6);
    doc.text(`Rif: ${rifremitente}`, 8, 3.6);
    doc.text(`Monto Factura: ${montofactura} BsS`, 13.5, 3.6);

    //LINEA 2

    //LINEA 3
    doc.text(`Destinatario: ${destinatario}`, 0.5, 4.8);
    doc.text(`Rif: ${rifdestinatario}`, 8, 4.8);
    doc.text(`Flete destino: ${fletedestino}`, 13.5, 4.8);

    //LINEA 4
    doc.text(`Dirección Despacho: ${direcciondespacho}`, 0.5, 5.4);
    doc.text(`Monto Flete: ${montofletedestino} BsS`, 13.5, 5.4);

    //LINEA 5
    doc.text(`${direcciondespacho2}`, 0.5, 6);
    doc.text(`Monto Total: ${montototal} BsS`, 13.5, 6);

    //LINEA 6

    //LINEA 7
    doc.text(`Observaciones: ${observaciones}`, 0.5, 7.2);
    doc.text(`${observaciones2}`, 0.5, 7.8);

    // Save the PDF
    doc.save(`Guía de Entrega #${this.factura.nroguia}.pdf`);
  }

  getTiposIdentificacion(){
    this.service.get('tiposidentificacion').then((result) => {
      this.tiposIdentificacion = result;
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  };
}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import { ServicesService } from '../../../services/services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalsolicitudrecolectaComponent } from '../../solicitudrecolecta/modalsolicitudrecolecta/modalsolicitudrecolecta.component';

@Component({
  selector: 'app-solicitudesrecolectas',
  templateUrl: './solicitudesrecolectas.component.html',
  styleUrls: ['./solicitudesrecolectas.component.css']
})
export class SolicitudesrecolectasComponent implements OnInit {

  data: any;
  estados:any;
  ciudades:any;
  tiposidentificacion:any;
  tiposmercancia:any;
  status:any[] = [
    {
      id: 0,
      nombre: 'Cancelado',
      color: 'red'
    },
    {
      id: 1,
      nombre: 'Pendiente',
      color: 'yellow'
    },
    {
      id: 2,
      nombre: 'Aceptado',
      color: 'green'
    }
  ]
  solicitudtosee:any[]=[];
  solicitudesrecolecta:any[]=[];

  constructor(
    private modalService: NgbModal,
    public service: ServicesService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getEstados();
    this.getCiudades();
    this.getTiposMercancia();
    this.getTiposIdentificacion();
    this.getSolicitudesRecolecta();
  }

  aceptarSolicitud(solicitudrecolecta:any){
    swal("¿Está seguro de aceptar esta solicitud de recolecta?", {
      icon: "warning",
      closeOnClickOutside: false,
      buttons: {
        rechazar: "Cancelar",
        aceptar: true
      },
    } as any)
    .then((value) => {
      switch (value) {
        case "aceptar":
          this.acceptSolicitudRecolecta(solicitudrecolecta);
          this.getSolicitudesRecolecta();
          break;
        case "rechazar":
        swal.close();
        break;
      }
    });
  }

  cancelarSolicitud(solicitudrecolecta:any){
    swal("¿Está seguro de cancelar esta solicitud de recolecta?", {
      icon: "warning",
      closeOnClickOutside: false,
      buttons: {
        rechazar: "Cancelar",
        aceptar: true
      },
    } as any)
    .then((value) => {
      switch (value) {
        case "aceptar":
          this.cancelSolicitudRecolecta(solicitudrecolecta)
          this.getSolicitudesRecolecta();
          break;
        case "rechazar":
        swal.close();
        break;
      }
    });
  }

    //Metodo para ver las solicitudes de recolecta
  openModal(accion:any,nro:any) { 
    this.solicitudtosee = []; //Para ver una solicitud de despacho
    for(let j =0; j<this.solicitudesrecolecta.length; j++){
      if(this.solicitudesrecolecta[j].nro == nro){
        this.solicitudtosee.push(this.solicitudesrecolecta[j]);
      }
    }
    const modalRef1 = this.modalService.open(ModalsolicitudrecolectaComponent, {size: 'xl'});
    modalRef1.componentInstance.solicitudReco = this.solicitudtosee;
    modalRef1.componentInstance.accion = accion;
    modalRef1.componentInstance.estados = this.estados;
    modalRef1.componentInstance.ciudades = this.ciudades;
    modalRef1.componentInstance.tiposmercancia = this.tiposmercancia;

    //Lo que me trae el modal al cerrarse
    modalRef1.result.then((result) => {
      if(result){
        let dataa:any[] = result
        if(dataa){
          this.getSolicitudesRecolecta();
        }
      }
    }, (reason)=> {
    })
  }

  getEstados(){
    this.service.get('estados').then((result) => {
      this.estados = result;
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  };

  getTiposIdentificacion(){
    this.service.get('tiposidentificacion').then((result) => {
      this.tiposidentificacion = result;
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  };

  getCiudades(){
    this.service.get('ciudades').then((result) => {
      this.ciudades = result;
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  };

  getTiposMercancia(){
    this.service.get('tiposmercancia').then((result) => {
      this.tiposmercancia = result;
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  };

  getSolicitudesRecolecta(){
    this.service.get(`users/solicitudesrecolecta`).then((result) =>{
      this.data = result;
      if(this.data.message == "No existen solicitudes de recolecta en la BD."){
        swal("","No existen solicitudes de recolecta", "info");
      }else if(this.data.length>0){
        this.solicitudesrecolecta = [];
        this.solicitudesrecolecta = this.data;
      }
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  };

  cancelSolicitudRecolecta(solicitudrecolecta:any){
    this.service.put(null,'solicitudrecolecta/cancel',solicitudrecolecta.nro).then((result) =>{
      this.data = result;
      if(this.data.message == `La solicitud de recolecta #${solicitudrecolecta.nro} ha sido eliminada logicamente.`){
        swal("Solicitud de Recolecta Cancelada", `Se ha cancelado su solicitud de recolecta #${solicitudrecolecta.nro} satisfactoriamente`, "success");
      }
    }, (err) => {
      swal("Error del Sistema", "Ha ocurrido un error al cancelar la solicitud de recolecta. Por favor, intentelo de nuevo.", "warning");
    })
  }

  acceptSolicitudRecolecta(solicitudrecolecta:any){
    this.service.put(null,'solicitudrecolecta/accept',solicitudrecolecta.nro).then((result) =>{
      this.data = result;
      if(this.data.message == `La solicitud de recolecta #${solicitudrecolecta.nro} ha sido aceptada satisfactoriamente.`){
        swal("Solicitud de Recolecta Aceptada", `Se ha aceptado la solicitud de recolecta #${solicitudrecolecta.nro} satisfactoriamente`, "success");
      }
    }, (err) => {
      swal("Error del Sistema", "Ha ocurrido un error al aceptar su solicitud de recolecta. Por favor, intentelo de nuevo.", "warning");
    })
  }



}

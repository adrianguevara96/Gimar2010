import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  url = "https://apijosgarm.herokuapp.com/api/";
  //url = "http://localhost:3001/api/";
  //url = "https://inversionesjosgar.com/api/";
  //url = "http://playershosting.com:9530/api/";
  //url = "http://transportegimar.com:9530/api/"
  
  user: any;

  business: any = {
    nombre: 'Multiservicios Y Transporte Gimar2010 C.A'
  };

  constructor(public http: HttpClient) { }

  //GET CON HEADER
  get(entidad:string){
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: 'Bearer: ' + this.getUserToken()
    })
    return new Promise(resolve => {
      this.http.get(this.url + entidad, { headers: head }).subscribe( (data) => {
        //console.log("Que me trae data en GET", data);
        resolve(data);
      }, (err) => {
        if(err.error.message){
          resolve(err.error);
        }
        swal("Error del Sistema", `Ha ocurrido un error en el sistema al hacer get: ${err}.`, "warning");
      });
    });
  }

  //GET SIN HEADER
  getWithoutHeader(entidad:string){
    return new Promise(resolve => {
      this.http.get(this.url + entidad).subscribe( (data) => {
        //console.log("Que me trae data en GET sin header", data);
        resolve(data);
      }, (err) => {
        swal("Error del Sistema", `Ha ocurrido un error en el sistema al hacer get: ${err}.`, "warning");
      });
    });
  }

  //POST CON HEADER
  post(datos, entidad:string) {
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer: ' + this.getUserToken()
    })
    return new Promise((resolve, reject) => {
      this.http.post(this.url + entidad, datos, { headers: head })
        .subscribe(res => {
          //console.log("Que me trae res en POST", res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

    //POST SIN HEADER
    postWithoutHeader(datos, entidad:string) {
      return new Promise((resolve, reject) => {
        this.http.post(this.url + entidad, datos)
          .subscribe(res => {
            //console.log("Que me trae res en POST", res);
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }

  //PUT CON HEADER
  put(datos, entidad: string, valor) {
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer: ' + this.getUserToken()
    })
    return new Promise((resolve, reject) => {
      this.http.put(this.url + entidad + '/' + valor, (datos),  { headers: head })
        .subscribe(res => {
          //console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  //PUT SIN HEADER
  putWithoutHeader(datos:any, entidad: string, valor:any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.url + entidad + '/' + valor, (datos))
        .subscribe(res => {
          //console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  //DELETE
  delete(entidad: string, valor) {
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: 'Bearer: ' + this.getUserToken()
    })
    return new Promise((resolve, reject) => {
      this.http.delete(this.url + entidad + '/' + valor, { headers: head })
        .subscribe(res => {
          //console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  //PUT PARA ELIMINACION LOGICA
  putLogic(entidad: string, valor) {
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
       //Authorization: 'Bearer: ' + this.getUserToken()
    })
    return new Promise((resolve, reject) => {
      this.http.put(this.url + entidad + '/' + valor, null)
        .subscribe(res => {
          //console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }



  /*  === VARIABLES A USAR EN TODO EL SISTEMA ===  */
  //Setear todos los datos del usuario
  setUser(id,tipousuario,nombres,apellidos, tlffijo,tlfmovil,tipoidentificacion,rif,email,razonsocial,dirfiscal,estado,ciudad,tipomercancia,status,password,token) {
    this.user = {
      id: id,
      tipousuario: tipousuario,
      nombres: nombres,
      apellidos: apellidos,
      tlfijo: tlffijo,
      tlfmovil: tlfmovil,
      tipoidentificacion: tipoidentificacion,
      rif: rif,
      email: email,
      razonsocial: razonsocial,
      dirfiscal: dirfiscal,
      estado: estado,
      ciudad: ciudad,
      tipomercancia: tipomercancia,
      status: status,
      password: password,
      token: token
    };
  }
  setBusiness(nombre){
    this.business = {
      nombre: nombre
    }
  }

  getTipoU(){
    if(this.user != null || this.user != undefined){
      return this.user.tipousuario
    } 
  }
  getBusiness(){
    return this.business;
  }
  //Obtener todo el usuario
  getUser(){
    return this.user;
  }
  //Obtener un dato especifico del usuario
  getUserToken(){
    return this.user.token;
  }
  getIDUser(){
    return this.user.id;
  }
  deleteUser(){
    this.user = null
  }

  /*  === INICIAR SESION ===  */
  //Method for user login
  logIn(email, pass) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url +'auth', { email: email, password: pass})
        .subscribe(res => {
          //let datos = JSON.parse(JSON.stringify(res));
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}

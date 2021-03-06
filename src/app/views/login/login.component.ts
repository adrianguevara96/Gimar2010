import { Component, ViewChild, ElementRef, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultLayoutComponent } from '../../containers';
import { PruebaComponent } from '../prueba/prueba.component';
import { ServicesService } from '../../services/services.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})

@Injectable()
export class LoginComponent {
  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  @ViewChild('user') userElement: ElementRef;
  data:any;

  //Validador de email
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"; 
  loginForm: FormGroup;
  passwordforgotForm: FormGroup;
  recuperarPass: boolean = false;

  emailforpassforgot:string;
  
  public tipoUser:number = 1;
  texto:number;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public def: DefaultLayoutComponent,
    public pru: PruebaComponent,
    public service: ServicesService
  ){
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.passwordforgotForm = this.formBuilder.group({
      emailforpassforgot: ["", Validators.required],
      passwordforpassforgot: ["", Validators.required],
      preguntaseguridad: ["", Validators.required],
      respuestaseguridad: ["", Validators.required]
    })
  }
  //Para Iniciar Sesion
  onSubmit() {
    if (this.loginForm.valid) {
      this.login();
      /*console.log(this.loginForm.value);
      if(this.loginForm.controls["email"].value == "adrian@adrian.com" && this.loginForm.controls["password"].value == "12345"){
        this.def.setnavItems(3);
        this.service.setUser(
          1,
          3,
          'Adrian',
          'Guevara',
          '0251-2338816',
          '0412-1526006',
          1,
          '24680211',
          'adrian@adrian.com',
          'Technology Solution A&A',
          'Aqui y Alla',
          14,
          5,
          5,
          1,
          12345,
          'jahdjksahdjksahdsajkdhsajkh13213'
        );
        this.router.navigate(['/dashboard']);
      }else if(this.loginForm.controls["email"].value == "operator@operator.com" && this.loginForm.controls["password"].value == "operator"){
        this.pru.settipoU(2);
        this.def.setnavItems(2);
        this.router.navigate(['/dashboard']);
      }else if(this.loginForm.controls["email"].value == "user@user.com" && this.loginForm.controls["password"].value == "user"){
        this.pru.settipoU(1);
        this.def.setnavItems(1);
        this.router.navigate(['/dashboard']);
      }else{
        alert("Credenciales Incorrectas.");
      }*/
    }else {
      alert("FILL ALL FIELDS");
    }
  }

  onSubmitpassword(){
    if (this.passwordforgotForm.valid) {
      this.regeneratePassword();
    }else{
      swal("Rellenar Campos", "Por favor, rellene todos los campos.", "info");
    }
  }

  /*  === LOGIN CON API===  */
  login(){
    const body = new FormData();
    body.append('email', this.loginForm.controls["email"].value);
    body.append('password',this.loginForm.controls["password"].value);
    this.service.logIn(this.loginForm.controls["email"].value, this.loginForm.controls["password"].value).then((result) => {     
      this.data = result;
      if(this.data.message == "No existe usuario asociado con ese email en la BD"){
        swal("No existe el usuario", "Por favor, ingrese un usuario válido.", "info");
      }else if(this.data.message == "Error al autenticar usuario, password incorrecto."){
        swal("Contraseña Incorrecta", "Por favor, ingrese su contraseña correctamente.", "info");
      }else{
        if(this.data.status!=0){
          this.service.setUser(
            this.data.user.id,
            this.data.user.tipousuario,
            this.data.user.nombres,
            this.data.user.apellidos,
            this.data.user.tlfijo,
            this.data.user.tlfmovil,
            this.data.user.tipoidentificacion,
            this.data.user.rif,
            this.data.user.email,
            this.data.user.razonsocial,
            this.data.user.dirfiscal,
            this.data.user.estado,
            this.data.user.ciudad,
            this.data.user.tipomercancia,
            this.data.user.status,
            this.data.user.password,
            this.data.token
          );
        }
        if(this.data.user.tipousuario == 3){
          this.def.setnavItems(3);
          this.router.navigate(['/dashboard']);
        }else if(this.data.user.tipousuario == 2){
          this.def.setnavItems(2);
          this.router.navigate(['/dashboard']);
        }else if(this.data.user.tipousuario == 1){
          this.def.setnavItems(1);
          this.router.navigate(['/dashboard']);
        }
      }
    }, (err) => {
      if(err.error.message == "Error al autenticar usuario, password incorrecto."){
        swal("Contraseña Incorrecta", "Por favor, ingrese su contraseña correctamente.", "info");
      }else if(err.error.message == "No existe usuario asociado con ese email en la BD"){
        swal("No existe el usuario", "Por favor, ingrese un usuario válido.", "info");
      }
    });
  }

  regeneratePassword(){
    let lostpassword = {
      email: this.passwordforgotForm.controls["emailforpassforgot"].value,
      password: this.passwordforgotForm.controls["passwordforpassforgot"].value,
      pregunta: this.passwordforgotForm.controls["preguntaseguridad"].value,
      respuesta: this.passwordforgotForm.controls["respuestaseguridad"].value
    }
        this.service.putWithoutHeader(lostpassword,'user/forgotpass', lostpassword.email).then((result) => {
          this.data = result
          if(this.data.message == "No existe el usuario en la BD"){
            swal({
              title: "El email no existe",
              text: `El email introducido no pertenece a ningun usuario. Por favor, ingrese nuevamente su email.`,
              icon: 'warning',
              closeOnClickOutside: false,
              buttons: {ok: true}} as any).then( (value) => {
              switch(value){
                case "ok": 
                //this.passwordforgotForm.controls["passwordforpassforgot"].setValue(" ");
                break;
              }
            })
          }else if(this.data.message == "Password cambiada correctamente."){
            swal({
              title: "Contraseña Actualizada",
              text: `Se ha actualizado su contraseña correctamente. Le invitamos a iniciar sesión.`,
              icon: 'success',
              closeOnClickOutside: false,
              buttons: {
                ok: true
              }
            } as any).then( (value) => {
              switch(value){
                case "ok": 
                //this.passwordforgotForm.controls["emailforpassforgot"].setValue(" ");
                //this.passwordforgotForm.controls["passwordforpassforgot"].setValue(" ");
                this.primaryModal.hide();
                break;
              }
            })
          }else if(this.data.message == "Pregunta y respuesta de seguridad erroneas."){
            swal("Datos de Seguridad Erroneos", "Su pregunta y respuesta de seguridad son incorrectas.", "info");
          }else{
            swal("Error al actualizar contraseña", "Su contraseña no ha sido actualizada.", "info");
          }
        }, (err) => {
          swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
        });
  }
}


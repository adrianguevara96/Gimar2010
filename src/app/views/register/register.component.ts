import { Component,OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  SITE_KEY = "6LdhwcwZAAAAAMtZTXMiFLDymU0rOWoLM_9OLSTn";
  SITE_KEY_SERVER = "6LdhwcwZAAAAAJyEVlRNqFsVPAn98BKC5KdNjTSg";
  user:any = {
    nombres: null,
    apellidos: null,
    razonsocial: "",
    email: "",
    password: "",
    tipousuario : 1,
    pregunta: "",
    respuesta: ""
  }
  business:any;

  //Validador de email
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"; 
  data: any;
  angForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public service: ServicesService) {
    this.createForm();
    this.business = this.service.getBusiness();
   }

  ngOnInit(){}

  resolved(captchaResponse: string) {
    //console.log(`Resolved response token: ${captchaResponse}`);
  }

  createForm() {
    this.angForm = this.formBuilder.group({
      razonsocial: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      repassword: ["", Validators.required],
      pregunta: ["", Validators.required],
      respuesta: ["", Validators.required],
      recaptchaReactive: ["", Validators.required]
    });
    
    /*this.angForm.controls["razonsocial"].valueChanges.subscribe(data => {
      console.log(data);
      console.log("pass", this.angForm.controls["password"].value);
      console.log("repass", this.angForm.controls["repassword"]);
      console.log("Errores de email: ", this.angForm.controls['email'].errors.pattern)
    });*/
  }
  
  onSubmit() {
    if (this.angForm.valid) {
      this.llenarFormUser();
      this.registerUser();
    }
    else {
      swal("Rellenar Campos", "Por favor, rellene todos los campos.", "info");
    }
  }
  llenarFormUser(){
    this.user.razonsocial = this.angForm.controls["razonsocial"].value;
    this.user.email = this.angForm.controls["email"].value;
    this.user.password = this.angForm.controls["password"].value;
    this.user.pregunta = this.angForm.controls["pregunta"].value;
    this.user.respuesta = this.angForm.controls["respuesta"].value;
  }
  vaciarFormUser(){
    this.user.razonsocial = "";
    this.angForm.controls["razonsocial"].setValue("");
    this.user.email = "";
    this.angForm.controls["email"].setValue("");
    this.user.password = "";
    this.angForm.controls["password"].setValue("");
  }
  registerUser(){
    this.service.postWithoutHeader(this.user,'user').then((result) => {
      this.data = result;
      if(this.data.message == `Usuario ${this.user.email} creado exitosamente.`){
        swal({
          title: "Usuario Registrado",
          text: `Se ha creado su usuario correctamente. Gracias por registrarse en ${this.business.nombre}. Le invitamos a iniciar sesión.`,
          icon: 'success',
          closeOnClickOutside: false,
          buttons: {
            ok: true
          }
        } as any).then( (value) => {
          switch(value){
            case "ok": 
            this.vaciarFormUser();
            this.router.navigate(['/login']);
            break;
          }
        })
      }else if(this.data.message == "Ya existe un usuario con ese correo"){
        swal("Correo en uso", "Ya existe un usuario registrado con ese correo, por favor ingrese otro correo.", "info");
      }
    },
    (err) => {
      swal("Error del Sistema", "Ha ocurrido un error, por favor intentelo de nuevo.", "warning");
    })
  }
  
}

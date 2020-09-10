import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import swal from 'sweetalert';
import { ServicesService } from '../services/services.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  role:any;
  constructor( 
    private router: Router,
    private service: ServicesService ){ }
  
  public canActivate() {
    this.role = this.service.getTipoU()
    
    if(this.role == undefined){
      swal("Acceso Denegado", `Ud no posee accesos para esta ruta.`, "warning");
      this.router.navigate(['/login']);
      return false; 
    }else{ 
      if(this.role == 3 || this.role == 2){
        return true;
      }else{
        swal("Acceso Denegado", `Ud no posee accesos para esta ruta.`, "warning");
        return false;
      }
    }
  }
}

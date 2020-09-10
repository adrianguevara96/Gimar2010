import {Component, Injectable} from '@angular/core';
import { navItemsUser } from '../../_nav';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
@Injectable({
  providedIn: 'root'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;

  //Lo que tiene el menu por defecto
  public navItemsUser = navItemsUser;

  constructor(private service: ServicesService){
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logOut(){
    this.service.deleteUser();
  }

  setnavItems(valor:any){
    //tipoUsuario = Usuario Administrador
    if(valor == 3) {
        this.navItemsUser.splice(0);
        this.navItemsUser.push(
          {title: true, name: 'Administración'},
          //{name: 'Dashboard Administrativo', url: '/administracion', icon:'fa fa-star'},
          {name: 'Usuarios', url: '/administracion/usuarios', icon: 'fa fa-server'},
          {name: 'Relaciones de Despacho',url: '/administracion/relacionesdespachos',icon: 'icon-drop'},
          {name: 'Solicitudes de Recolectas',url: '/administracion/solicitudesrecolectas',icon: 'icon-drop'},
          {name: 'Guías de Carga',url: '/administracion/guiascarga',icon: 'icon-drop'},
          {name: 'Tracking',url: '/administracion/tracking',icon: 'fa fa-map-marker'},
          {name: 'Guías de Entrega',url: '/administracion/guiasentrega',icon: 'icon-drop'},
          /*  {title: true,name: 'Theme'},
          {name: 'Colors',url: '/theme/colors',icon: 'icon-drop'},
          {name: 'Typography',url: '/theme/typography',icon: 'icon-pencil'},
          {title: true,name: 'Components'},
          {name: 'Base',url: '/base',icon: 'icon-puzzle',
            children: [
              {name: 'Cards',url: '/base/cards',icon: 'icon-puzzle'},
              {name: 'Carousels',url: '/base/carousels',icon: 'icon-puzzle'},
              {name: 'Collapses',url: '/base/collapses',icon: 'icon-puzzle'},
              {name: 'Forms',url: '/base/forms',icon: 'icon-puzzle'},
              {name: 'Navbars',url: '/base/navbars',icon: 'icon-puzzle'},
              {name: 'Pagination',url: '/base/paginations', icon: 'icon-puzzle'},
              {name: 'Popovers',url: '/base/popovers',icon: 'icon-puzzle'},
              {name: 'Progress',url: '/base/progress',icon: 'icon-puzzle'},
              {name: 'Switches',url: '/base/switches',icon: 'icon-puzzle'},
              {name: 'Tables',url: '/base/tables',icon: 'icon-puzzle'},
              {name: 'Tabs',url: '/base/tabs',icon: 'icon-puzzle'},
              {name: 'Tooltips',url: '/base/tooltips',icon: 'icon-puzzle'}
            ]
          },
          {name: 'Buttons',url: '/buttons',icon: 'icon-cursor',
            children: [
              {name: 'Buttons',url: '/buttons/buttons',icon: 'icon-cursor'},
              {name: 'Dropdowns',url: '/buttons/dropdowns',icon: 'icon-cursor'},
              {name: 'Brand Buttons',url: '/buttons/brand-buttons',icon: 'icon-cursor'}
            ]
          },
          {name: 'Charts',url: '/charts',icon: 'icon-pie-chart'},
          {name: 'Icons',url: '/icons',icon: 'icon-star',
            children: [
              {name: 'CoreUI Icons',url: '/icons/coreui-icons',icon: 'icon-star',
                badge: {variant: 'success',text: 'NEW'}
              },
              {name: 'Flags',url: '/icons/flags',icon: 'icon-star'},
              {name: 'Font Awesome',url: '/icons/font-awesome',icon: 'icon-star',
                badge: {variant: 'secondary',text: '4.7'}
              },
              {name: 'Simple Line Icons',url: '/icons/simple-line-icons',icon: 'icon-star'}
            ]
          },
          {name: 'Notifications',url: '/notifications',icon: 'icon-bell',
            children: [
              {name: 'Alerts',url: '/notifications/alerts',icon: 'icon-bell'},
              {name: 'Badges',url: '/notifications/badges',icon: 'icon-bell'},
              {name: 'Modals',url: '/notifications/modals',icon: 'icon-bell'}
            ]
          },
          {name: 'Widgets',url: '/widgets',icon: 'icon-calculator',
            badge: {variant: 'info',text: 'NEW'}
          }
        )
      }else if(this.navItemsUser.length > 8){
        this.navItemsUser.splice(8,this.navItemsUser.length);
      }*/
        )
    //tipoUsuario = Operador
    }else if(valor == 2){
      this.navItemsUser.splice(0);
      this.navItemsUser.push(
        {title: true, name: 'Administración'},
        //{name: 'Dashboard Administrativo', url: '/administracion', icon:'fa fa-star'},
        {name: 'Usuarios', url: '/administracion/usuarios', icon: 'fa fa-server'},
        {name: 'Relaciones de Despacho',url: '/administracion/relacionesdespachos',icon: 'icon-drop'},
        {name: 'Solicitudes de Recolectas',url: '/administracion/solicitudesrecolectas',icon: 'icon-drop'},
        {name: 'Guías de Carga',url: '/administracion/guiascarga',icon: 'icon-drop'},
        {name: 'Tracking',url: '/administracion/tracking',icon: 'fa fa-map-marker'},
        {name: 'Guías de Entrega',url: '/administracion/guiasentrega',icon: 'icon-drop'})
    //tipoUsuario = Usuario Comun
    }else{
      this.navItemsUser.splice(0);
      this.navItemsUser.push(
        {
          title: true,
          name: 'Menú'
        },
        {
          name: 'Inicio',
          url: '/dashboard',
          icon: 'icon-home'
        },
        {
          name: 'Usuario',
          url: '/profile',
          icon: 'icon-user'
        },
        {
          name: 'Destinatarios',
          url: '/destinatarios',
          icon: 'icon-people'
        },
        {
          name: 'Relación de Despacho',
          url: '/relaciondespacho',
          icon: 'fa fa-truck'
        },
        {
          name: 'Tracking',
          url: '/tracking',
          icon: 'fa fa-map-marker'
        },
        /*{
          name: 'Facturación',
          url: '/estadocuenta',
          icon: 'fa fa-money'
        },*/
        {
          name: 'Solicitud Recolecta',
          url: '/solicitudrecolecta',
          icon: 'fa fa-file-text-o'
        },
      )
    }
  }
}


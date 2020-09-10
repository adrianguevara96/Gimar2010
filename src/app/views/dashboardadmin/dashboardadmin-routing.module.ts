import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardadminComponent } from './dashboardadmin.component';
import { UsersComponent } from './users/users.component';
import { RelacionesdespachosComponent } from './relacionesdespachos/relacionesdespachos.component';
import { SolicitudesrecolectasComponent } from './solicitudesrecolectas/solicitudesrecolectas.component';
import { GuiascargasComponent } from './guiascargas/guiascargas.component';
import { TrackingComponent } from './tracking/tracking.component';

import { RoleGuardService } from './../../guards/role-guard.service';
import { GuiasentregasComponent } from './guiasentregas/guiasentregas.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Panel Administrativo'
    },
    children: [
      {
        path: '',
        redirectTo: 'usuarios'
      },
      {
        path: 'inicio',
        canActivate: [RoleGuardService],
        component: DashboardadminComponent,
        data: {
          title: 'Inicio'
        }
      },
      {
        path: 'usuarios',
        canActivate: [RoleGuardService],
        component: UsersComponent,
        data: {
          title: 'Usuarios'
        }
      },
      {
        path: 'relacionesdespachos',
        canActivate: [RoleGuardService],
        component: RelacionesdespachosComponent,
        data: {
          title: 'Relaciones de Despacho'
        }
      },
      {
        path: 'solicitudesrecolectas',
        canActivate: [RoleGuardService],
        component: SolicitudesrecolectasComponent,
        data: {
          title: 'Solicitudes de Recolecta'
        }
      },
      {
        path: 'guiascarga',
        canActivate: [RoleGuardService],
        component: GuiascargasComponent,
        data: {
          title: 'Guías de Carga'
        }
      },
      {
        path: 'tracking',
        canActivate: [RoleGuardService],
        component: TrackingComponent,
        data: {
          title: 'Tracking'
        }
      },
      {
        path: 'guiasentrega',
        canActivate: [RoleGuardService],
        component: GuiasentregasComponent,
        data: {
          title: 'Guías de Entrega'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardadminRoutingModule {}
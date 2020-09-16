import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { FactdetailsComponent } from './views/factdetails/factdetails.component';


import { RoleGuardService } from './guards/role-guard.service';
import { LoginGuardService } from './guards/login-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'factdetails',
    component: FactdetailsComponent,
    data: {
      title: 'Fact Details Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      /* ####### R U T A S   D E L    M E N U    U S E R ####### */
      {
        path: 'profile',
        canActivate: [LoginGuardService],
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'destinatarios',
        canActivate: [LoginGuardService],
        loadChildren: () => import('./views/destinatarios/destinatarios.module').then(m => m.DestinatariosModule)
      },
      {
        path: 'relaciondespacho',
        canActivate: [LoginGuardService],
        loadChildren: () => import('./views/ordenescargas/ordenescargas.module').then(m => m.OrdenescargasModule)
      },
      {
        path: 'tracking',
        canActivate: [LoginGuardService],
        loadChildren: () => import('./views/tracking/tracking.module').then(m => m.TrackingModule)
      },
      {
        path: 'estadocuenta',
        loadChildren: () => import('./views/estadocuenta/estadocuenta.module').then(m => m.EstadocuentaModule)
      },
      {
        path: 'solicitudrecolecta',
        canActivate: [LoginGuardService],
        loadChildren: () => import('./views/solicitudrecolecta/solicitudrecolecta.module').then(m => m.SolicitudrecolectaModule)
      },
      /* ####### R U T A S   D E L    M E N U   A D M I N ####### */
      {
        path: 'administracion',
        canActivate: [RoleGuardService],
        loadChildren: () => import('./views/dashboardadmin/dashboardadmin.module').then(m => m.DashboardadminModule)
      },
      /* ############################################# */
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'dashboard',
        canActivate: [LoginGuardService],
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot((routes), {useHash:false})],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

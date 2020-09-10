import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardadminComponent } from './dashboardadmin.component';
import { DashboardadminRoutingModule } from './dashboardadmin-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from '../../containers/default-layout/default-layout.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UsersComponent } from './users/users.component';
import { SolicitudesrecolectasComponent } from './solicitudesrecolectas/solicitudesrecolectas.component';
import { RelacionesdespachosComponent } from './relacionesdespachos/relacionesdespachos.component';
import { GuiascargasComponent } from './guiascargas/guiascargas.component';
import { TrackingComponent } from './tracking/tracking.component';
import { GuiasentregasComponent } from './guiasentregas/guiasentregas.component';

@NgModule({
  imports: [
    FormsModule,
    DashboardadminRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CommonModule,
    HttpClientModule, 
    AngularSvgIconModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [
  DefaultLayoutComponent
],
  declarations: [ DashboardadminComponent, UsersComponent, SolicitudesrecolectasComponent, RelacionesdespachosComponent, GuiascargasComponent, TrackingComponent, GuiasentregasComponent ]
})
export class DashboardadminModule { }
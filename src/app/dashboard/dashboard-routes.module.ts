import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
import { AuthGardGuard } from '../services/auth-gard.guard';


const rutasHijas: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children: dashboardRoutes,
    //canActivate:[AuthGardGuard]
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(rutasHijas)
  ],
  exports:[
    RouterModule
  ]
})
export class DashboardRoutesModule { }

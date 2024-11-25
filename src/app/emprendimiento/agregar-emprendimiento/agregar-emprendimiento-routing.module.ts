import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgregarEmprendimientoPage } from './agregar-emprendimiento.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarEmprendimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),FormsModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class AgregarEmprendimientoPageRoutingModule {}
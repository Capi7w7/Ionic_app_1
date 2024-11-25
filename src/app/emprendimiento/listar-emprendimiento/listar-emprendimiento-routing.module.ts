import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarEmprendimientoPage } from './listar-emprendimiento.page';

const routes: Routes = [
  {
    path: '',
    component: ListarEmprendimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarEmprendimientoPageRoutingModule {}

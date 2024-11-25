import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarEmprendimientoPageRoutingModule } from './listar-emprendimiento-routing.module';

import { ListarEmprendimientoPage } from './listar-emprendimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarEmprendimientoPageRoutingModule
  ],
  declarations: [ListarEmprendimientoPage]
})
export class ListarEmprendimientoPageModule {}

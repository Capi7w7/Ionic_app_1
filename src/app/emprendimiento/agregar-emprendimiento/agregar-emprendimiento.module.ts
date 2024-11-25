import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarEmprendimientoPageRoutingModule } from './agregar-emprendimiento-routing.module';

import { AgregarEmprendimientoPage } from './agregar-emprendimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarEmprendimientoPageRoutingModule
  ],
  declarations: [AgregarEmprendimientoPage]
})
export class AgregarEmprendimientoPageModule {}

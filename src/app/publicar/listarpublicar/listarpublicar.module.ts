import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarpublicarPageRoutingModule } from './listarpublicar-routing.module';

import { ListarpublicarPage } from './listarpublicar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarpublicarPageRoutingModule
  ],
  declarations: [ListarpublicarPage]
})
export class ListarpublicarPageModule {}

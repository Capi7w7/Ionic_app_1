import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarpublicarPage } from './listarpublicar.page';

const routes: Routes = [
  {
    path: '',
    component: ListarpublicarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarpublicarPageRoutingModule {}

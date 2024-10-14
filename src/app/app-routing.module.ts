import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'inicio/:id',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'resetpass',
    loadChildren: () => import('./resetpass/resetpass.module').then(m => m.ResetpassPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then(m => m.ModalPageModule)
  },
  {
    path: 'listar',
    loadChildren: () => import('./crudapi/listar/listar.module').then(m => m.ListarPageModule)
  },
  {
    path: 'agregar',
    loadChildren: () => import('./crudapi/agregar/agregar.module').then(m => m.AgregarPageModule)
  },
  {
    path: 'actualizar',
    loadChildren: () => import('./crudapi/actualizar/actualizar.module').then(m => m.ActualizarPageModule)
  },
  {
    path: 'leer',
    loadChildren: () => import('./crudapi/leer/leer.module').then(m => m.LeerPageModule)
  },
  {
    path: 'eliminar',
    loadChildren: () => import('./crudapi/eliminar/eliminar.module').then(m => m.EliminarPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

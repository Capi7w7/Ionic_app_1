import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/acceso.guard';

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
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'resetpass',
    loadChildren: () => import('./resetpass/resetpass.module').then(m => m.ResetpassPageModule)
  },
  {
    path: 'listar/:id',
    loadChildren: () => import('./crudapi/listar/listar.module').then( m => m.ListarPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'agregar/:id',
    loadChildren: () => import('./crudapi/agregar/agregar.module').then( m => m.AgregarPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'actualizar/:id',
    loadChildren: () => import('./crudapi/actualizar/actualizar.module').then( m => m.ActualizarPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'leer/:id',
    loadChildren: () => import('./crudapi/leer/leer.module').then( m => m.LeerPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'eliminar/:id',
    loadChildren: () => import('./crudapi/eliminar/eliminar.module').then( m => m.EliminarPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**', redirectTo: 'not-found'
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'agregar-emprendimiento',
    loadComponent: () =>
      import('./emprendimiento/agregar-emprendimiento/agregar-emprendimiento.page').then(
        (m) => m.AgregarEmprendimientoPage
      ),
  },
  {
    path: 'listar-emprendimiento',
    loadChildren: () => import('./emprendimiento/listar-emprendimiento/listar-emprendimiento.module').then( m => m.ListarEmprendimientoPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

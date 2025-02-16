import { EmpresaDetailsComponent } from './details/editar/empresa-details.component';
import { Routes } from '@angular/router';

export const empresasRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./empresas.component').then(m => m.EmpresasComponent)
  },
  {
    path: 'nova',
    loadComponent: () => import('./details/cadastrar/empresa-cadastro.component').then(m => m.EmpresaCadastroComponent)
  },
  {
    path: ':id/editar',
    loadComponent: () => import('./details/editar/empresa-details.component').then(m => m.EmpresaDetailsComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./details/editar/empresa-details.component').then(m => m.EmpresaDetailsComponent)
  }
];
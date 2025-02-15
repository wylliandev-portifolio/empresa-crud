import { Routes } from '@angular/router';

export const empresasRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./empresas.component').then(m => m.EmpresasComponent)
  },
  {
    path: 'nova',
    loadComponent: () => import('./details/empresa-details.component').then(m => m.EmpresaDetailsComponent)
  },
  {
    path: ':id/editar',
    loadComponent: () => import('./details/empresa-details.component').then(m => m.EmpresaDetailsComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./details/empresa-details.component').then(m => m.EmpresaDetailsComponent)
  }
];
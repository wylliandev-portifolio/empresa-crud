import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'notfound',
        loadComponent: () => import('./shared/not-found/not-found.component').then(m => m.NotFoundComponent)
    },
    {
        path : 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'empresas',
        loadComponent: () => import('./features/empresas/empresas.component').then(m => m.EmpresasComponent) 
    },
    {
        path: 'sidebar',
        loadComponent: () => import('./shared/sidebar/sidebar.component').then(m => m.SidebarComponent) 
    },
    {
        path: 'usuarios',
        loadComponent: () => import('./features/usuarios/usuarios.component').then(m => m.UsuariosComponent) 
    },
    { 
        path: '**', redirectTo: 'notfound' 
    }        
];

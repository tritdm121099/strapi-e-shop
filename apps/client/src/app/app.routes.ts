import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./page/home.component').then((m) => m.HomeComponent),
  }
];

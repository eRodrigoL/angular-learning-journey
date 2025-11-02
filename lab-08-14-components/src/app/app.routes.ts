// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Lifecycle } from './pages/lifecycle/lifecycle';

export const routes: Routes = [
  { path: '', redirectTo: 'lifecycle', pathMatch: 'full' },
  { path: 'lifecycle', component: Lifecycle },
];

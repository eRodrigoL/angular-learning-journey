// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Lifecycle } from './pages/lifecycle/lifecycle';
import { Binding } from './pages/binding/binding';

export const routes: Routes = [
  { path: '', redirectTo: 'lifecycle', pathMatch: 'full' },
  { path: 'lifecycle', component: Lifecycle },
  { path: 'binding', component: Binding },
];

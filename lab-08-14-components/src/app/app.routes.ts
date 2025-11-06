// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Lifecycle } from './pages/lifecycle/lifecycle';
import { Binding } from './pages/binding/binding';
import { Flow } from './pages/flow/flow';
import { Pipes } from './pages/pipes/pipes';

export const routes: Routes = [
  { path: '', redirectTo: 'lifecycle', pathMatch: 'full' },
  { path: 'lifecycle', component: Lifecycle },
  { path: 'binding', component: Binding },
  { path: 'flow', component: Flow },
  { path: 'pipes', component: Pipes },
  { path: '**', redirectTo: 'lifecycle' },
];

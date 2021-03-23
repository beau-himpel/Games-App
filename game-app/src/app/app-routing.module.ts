import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authGuard';

const routes: Routes = [
  { path: "lazy", loadChildren: async () => (await import('./shared/shared.module')).SharedModule, canActivate: [AuthGuard] },
  { path: "login", loadChildren: async () => (await import('./login/login.module')).LoginModule },
  { path: '**', redirectTo: 'lazy/collection' },
];

export const appRoutingModule = RouterModule.forRoot(routes, { useHash: true });

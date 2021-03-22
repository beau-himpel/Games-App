import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authGuard';
import { CollectionComponent } from './collection/collection.component';
import { LoginComponent } from './login/login.component';
import { ManageGamesComponent } from './manage-games/manage-games.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "collection", component: CollectionComponent, canActivate: [AuthGuard] },
  { path: "add", component: ManageGamesComponent, canActivate: [AuthGuard] }
];

export const appRoutingModule = RouterModule.forRoot(routes, {useHash: true});

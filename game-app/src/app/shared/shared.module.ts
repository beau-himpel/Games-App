import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from '../collection/collection.component';
import { GameModalComponent } from '../game-modal/game-modal.component';
import { GameComponent } from '../game/game.component';
import { ManageGamesComponent } from '../manage-games/manage-games.component';

const routes: Routes = [
  { path: "collection", component: CollectionComponent, pathMatch: "full" },
  { path: "add", component: ManageGamesComponent, pathMatch: "full" }
];

@NgModule({
  declarations: [
    GameComponent,
    CollectionComponent,
    ManageGamesComponent,
    GameModalComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatDialogModule,
    MatChipsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule
  ]
})
export class SharedModule { }

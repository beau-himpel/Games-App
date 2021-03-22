import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameDetails } from '../models';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss']
})
export class GameModalComponent {

  platform: string;

  constructor(public dialogRef: MatDialogRef<GameModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GameDetails) {
    // this will always be true in this case
    // could change typing to avoid the if statement in the future
    if (typeof (data.platform) !== 'string') {
      this.platform = data.platform.name;
    }
  }

}

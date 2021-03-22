import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { GameModalComponent } from '../game-modal/game-modal.component';
import { GameService } from '../manage-games/game.service';
import { Game } from '../models';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  @Input() game: Game;
  @Input() isCollection: boolean;
  @Input() owned: boolean;

  @Output() add: EventEmitter<number> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();

  constructor(private gameService: GameService,
    public dialog: MatDialog) {
  }

  getDetails(game: Game) {
    this.gameService.getGame(game.gameId)
      .pipe(take(1))
      .subscribe(res => {
        this.showModal(res);
      });
  }

  showModal(game: Game) {
    this.dialog.open(GameModalComponent, {
      width: '80%',
      data: game
    });
  }

}

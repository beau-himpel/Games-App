import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { Game } from '../models';
import { CollectionService } from './collection.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  games: Game[];
  searchFilter: string;
  filteredGames: Game[];
  showFiltered = false;

  constructor(private collectionService: CollectionService,
    private _snackBar: MatSnackBar) { 
    this.collectionService.usersGames
    .subscribe(games => {
      this.games = games;
    });
  }

  ngOnInit() {
    if (this.games === null) {
      this.collectionService.getCollection()
      .pipe(take(1))
      .subscribe();
    }
  }

  deleteGame(game: Game) {
    this.collectionService.deleteGame(game.gameId)
      .pipe(take(1))
      .subscribe(res => {
        this._snackBar.open(`${game.title} removed from collection`, null, {
          duration: 2000,
        });
      });
  }

  filterGames() {
    const searchText = this.searchFilter.toLocaleLowerCase(); 
    this.filteredGames = this.games.filter(game => {
      // this will always be true in this case
      // could change typing to avoid the if statement in the future
      if (typeof(game.platform) === 'string' ) {
        return game.title.toLocaleLowerCase().includes(searchText)  || game.platform.toLocaleLowerCase().includes(searchText);
      }
    });
    this.showFiltered = true;
  }

}

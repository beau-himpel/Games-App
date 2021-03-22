import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { CollectionService } from '../collection/collection.service';
import { Game, Platform } from '../models';
import { PlatformService } from '../shared/platform.service';
import { GameService } from './game.service';

@Component({
  selector: 'app-manage-games',
  templateUrl: './manage-games.component.html',
  styleUrls: ['./manage-games.component.scss']
})
export class ManageGamesComponent implements OnInit {

  searchResults: Game[];
  platforms: Platform[];
  searchForm: FormGroup;
  gameIds: string[];

  constructor(private formBuilder: FormBuilder,
    private collectionService: CollectionService,
    private _snackBar: MatSnackBar,
    private platformService: PlatformService,
    private gameService: GameService) {
    this.collectionService.usersGames
      .subscribe(games => {
        if (!!games) {
          this.gameIds = games.map(game => game.gameId.toString());
        }
      });
    this.searchForm = this.formBuilder.group({
      name: [''],
      platform: ['']
    });
  }

  ngOnInit() {
    if (this.collectionService.usersGamesValue === null) {
      this.collectionService.getCollection()
      .pipe(take(1))
      .subscribe();
    }
    this.getPlatforms();
  }

  isInCollection(gameId: number) {
    return this.gameIds.includes(gameId.toString());
  }

  getPlatforms() {
    this.platformService.getPlatforms()
      .pipe(take(1))
      .subscribe(res => {
        this.platforms = res;
      });
  }

  search() {
    if (this.searchForm.valid) {
      this.gameService.search(this.searchForm.controls.name.value, this.searchForm.controls.platform.value)
        .pipe(take(1))
        .subscribe(res => {
          this.searchResults = res;
        });
    }
  }

  addGame(game: Game) {
    this.collectionService.addGame(game.gameId)
      .pipe(take(1))
      .subscribe(res => {
        this._snackBar.open(`${game.title} added to collection`, null, {
          duration: 2000,
        });
      });
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { apiUrl, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private usersGamesSubject: BehaviorSubject<Game[]>;
  usersGames: Observable<Game[]>;

  constructor(private http: HttpClient) {
    this.usersGamesSubject = new BehaviorSubject<Game[]>(null);
    this.usersGames = this.usersGamesSubject.asObservable();
  }

  get usersGamesValue(): Game[] {
    return this.usersGamesSubject.value;
  }

  clearCollection() {
    this.usersGamesSubject.next(null);
  }

  getCollection(): Observable<Game[]> {
    return this.http.get<any>(`${apiUrl}/Collection`)
      .pipe(map(res => {
        this.usersGamesSubject.next(res);
        return res;
      }));
  }

  addGame(gameId: number) {
    return this.http.post<any>(`${apiUrl}/Collection/${gameId}`, null)
      .pipe(switchMap(res => {
        return this.getCollection();
      }));
  }

  deleteGame(gameId: number) {
    return this.http.delete<any>(`${apiUrl}/Collection/${gameId}`)
      .pipe(switchMap (res => {
        return this.getCollection();
      }));
  }

}

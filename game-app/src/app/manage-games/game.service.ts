import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game, apiUrl } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) {
  }

  getGame(gameId: number): Observable<Game> {
    return this.http.get<any>(`${apiUrl}/Games/${gameId}`)
      .pipe(map(res => {
        return res;
      }));
  }

  search(name: string, platformId?: string): Observable<Game[]> {
    return this.http.get<any>(`${apiUrl}/Games/search/${name}`, { params: { platformId: platformId }})
      .pipe(map(res => {
        return res;
      }));
  }

}

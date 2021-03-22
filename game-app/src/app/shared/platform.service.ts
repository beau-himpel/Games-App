import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiUrl, Platform } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private http: HttpClient) {
  }

  getPlatforms(): Observable<Platform[]> {
    return this.http.get<any>(`${apiUrl}/Platforms`)
      .pipe(map(res => {
        return res;
      }));
  }

}

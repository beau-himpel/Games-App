import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CollectionService } from '../collection/collection.service';
import { apiUrl } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<string>;
  currentUser: Observable<string>;

  constructor(private http: HttpClient,
    private collectionService: CollectionService,
    private router: Router) {
    this.currentUserSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get currentUserValue(): string {
    return this.currentUserSubject.value;
  }

  login(info: FormData) {
    return this.http.post<any>(`${apiUrl}/login`, info)
      .pipe(map(user => {
        this.currentUserSubject.next(user.token);
        localStorage.setItem('currentUser', JSON.stringify(user.token));
        this.router.navigate(['collection']);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.collectionService.clearCollection();
    this.router.navigate(['login']);
  }

}

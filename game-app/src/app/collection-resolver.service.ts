import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CollectionService } from './collection/collection.service';

@Injectable()
export class CollectionResolver implements Resolve<any> {

  constructor(private http: HttpClient,
    private collectionService: CollectionService) { }

  resolve(): Observable<any> {
    return this.collectionService.getCollection
    .pipe(take(1))
    .s
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Llama } from './llama.model';

@Injectable({
  providedIn: 'root'
})
export class AnotherService {
  constructor(private http: HttpClient) { }

  getLlamasFromService(): Observable<Llama[]> {
    return this.http.get<Llama[]>('api/getLlamas');
    // return of([{
    //   name: 'Mike', imageFileName: '1.jpg',
    // }, {
    //   name: 'Jean', imageFileName: '2.jpg',
    // }]);
  }

}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Llama } from './llama.model';

@Injectable({
  providedIn: 'root'
})
export class AnotherService {
  constructor() { }

  getLlamasFromService(): Observable<Llama[]> {
    return of([{
      name: 'Mike', imageFileName: '1.jpg',
    }, {
      name: 'Jean', imageFileName: '2.jpg',
    }]);
  }

}

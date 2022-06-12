import { Injectable } from '@angular/core';
import { Llama } from './llama.model';
@Injectable({
  providedIn: 'root'
})
export class FrontService {
  constructor() {}

  getFeaturedLlamas(config?: any): Promise<Llama[]> {
    return Promise.resolve([{
      name: 'Mike', imageFileName: '1.jpg',
    }, {
      name: 'Jean', imageFileName: '2.jpg',
    }]);
  }
}

import { Injectable } from '@angular/core';
import { Llama } from './llama.model';
// import { AnotherService } from './another.service';

@Injectable({
  providedIn: 'root'
})
export class FrontService {
  // constructor(private anotherService: AnotherService) {}
  constructor() {}

  getFeaturedLlamas(config?: any): Llama[] {
    return [{
      name: 'Mike', imageFileName: '1.jpg',
    }, {
      name: 'Jean', imageFileName: '2.jpg',
    }];
  }
  // getFeaturedLlamas(config?: any): Promise<Llama[]> {
  //   return this.anotherService.getLlamasFromServer().toPromise();
  // }
}

import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AnotherService } from './another.service';
import { Llama } from './llama.model';
@Injectable({
  providedIn: 'root'
})
export class FrontService {
  constructor(private anotherService: AnotherService) {}

  getFeaturedLlamas(config?: any): Promise<Llama[] | undefined> {

    // toPromise 已經是 deprecated (https://rxjs.dev/deprecations/to-promise)
    // return this.anotherService.getLlamasFromService().toPromise();
    return firstValueFrom(this.anotherService.getLlamasFromService());
  }
}

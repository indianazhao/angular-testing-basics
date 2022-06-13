import { Injectable } from '@angular/core';
import { AnotherService } from './another.service';
import { Llama } from './llama.model';
@Injectable({
  providedIn: 'root'
})
export class FrontService {
  constructor(private anotherService: AnotherService) {}

  getFeaturedLlamas(): Promise<Llama[]> {
    return new Promise((resolve, reject) => {
      this.anotherService.getLlamasFromService().subscribe({
        next: (value) => resolve(value),
        error: (error) => reject(error),
      });
    });
  }
}

import { FrontService } from './front.service';
import { Component, OnInit } from '@angular/core';
import { Llama } from './llama.model';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {

  llamas!: Llama[];
  isAsyncDone = false;

  constructor(private frontService: FrontService) { }

  ngOnInit(): void {
    this.frontService.getFeaturedLlamas().then(result => {
      this.llamas = result;
    });
  }

  // async(): Promise<void> {
  //   return Promise.resolve().then(() => {
  //     this.isAsyncDone = true;
  //   });
  // }

  // async(): Promise<void> {
  //   return Promise.resolve().then(() => {
  //     return  new Promise((resolve) => {
  //       setTimeout(() => {
  //         this.isAsyncDone = true;
  //         resolve();
  //       }, 4000);
  //     });
  //   });
  // }

  async(): Promise<void> {
    setTimeout(() => {
      console.log('test');
    }, 0);
    return Promise.resolve().then(() => {
      this.isAsyncDone = true;
    });
  }

  isListVisible(): boolean {
    return (this.llamas.length > 0);
  }
}

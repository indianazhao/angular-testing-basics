import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';

import { Llama } from './llama.model';
import { AnotherService } from './another.service';

describe('AnotherService', () => {
  let serviceUnderTest: AnotherService;
  let httpSpy: Spy<HttpClient>;
  let actualResult: any;
  let fakeLlamas: Llama[] | undefined;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        AnotherService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]
    });

    serviceUnderTest = TestBed.inject(AnotherService);
    httpSpy = TestBed.inject(HttpClient) as Spy<HttpClient>;
    actualResult = undefined;
    fakeLlamas = undefined;
  });

  describe('Method: getLlamasFromServer', () => {
    When(() => {
      serviceUnderTest.getLlamasFromService().subscribe(result => actualResult = result);
    });

    describe('Given a successful request Then return the llamas', () => {
      Given(() => {
        fakeLlamas = [{ name: 'fake name', imageFileName: 'fake image' }];
        httpSpy.get.and.nextOneTimeWith(fakeLlamas);
      });

      Then(() => {
        expect(actualResult).toEqual(fakeLlamas);
      });
    });
  });
});

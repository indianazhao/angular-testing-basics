import { AnotherService } from './another.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { Llama } from './llama.model';
import { fakeAsync, TestBed } from "@angular/core/testing";
import { FrontService } from "./front.service";

describe('FrontService', () => {
  let anotherServiceSpy: Spy<AnotherService>;
  let serviceUnderTest: FrontService;
  let actualResult: any;
  let fakeLlamas: Llama[] | undefined;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        FrontService,
        { provide: AnotherService, useValue: createSpyFromClass(AnotherService) }
      ]
    });

    serviceUnderTest = TestBed.inject(FrontService);
    anotherServiceSpy = TestBed.inject(AnotherService) as Spy<AnotherService>;

    fakeLlamas = undefined;
    actualResult = undefined;
  });

  describe('Method: getFeaturedLlamas', () => {

    Given(() => {
      fakeLlamas = [{name: 'fake name', imageFileName: 'fake image'}];

      // 下面兩行可以用 nextOneTimeWith 取代
      // anotherServiceSpy.getLlamasFromService.and.nextWith(fakeLlamas);
      // anotherServiceSpy.getLlamasFromService.and.complete();
      anotherServiceSpy.getLlamasFromService.and.nextOneTimeWith(fakeLlamas);
    });

    When(fakeAsync(() => {
      serviceUnderTest.getFeaturedLlamas().then(result => actualResult = result);
    }));

    When(fakeAsync(async () => {
      actualResult = await serviceUnderTest.getFeaturedLlamas();
    }));

    Then(() => {
      expect(actualResult.length).toBeGreaterThanOrEqual(1);
      expect(actualResult).toEqual(fakeLlamas);
    });

  });

});

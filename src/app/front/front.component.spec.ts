import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FrontComponent } from './front.component';
import { FrontService } from './front.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

describe('FrontComponent', () => {
  let componentUnderTest: FrontComponent;
  let actualValue: any;
  let frontServiceSpy: Spy<FrontService>;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        FrontComponent,
        {
          provide: FrontService,
          useValue: createSpyFromClass(FrontService)
        }
      ]
    });

    componentUnderTest = TestBed.inject(FrontComponent);
    frontServiceSpy = TestBed.inject(FrontService) as Spy<FrontService>;
  });

  describe('INIT', () => {
    Given(() => {
      frontServiceSpy.getFeaturedLlamas.and.returnValue(
        Promise.resolve([{ name: 'indi', imageFileName: 'fakeImage' }])
      );
    });

    When(fakeAsync(() => {
      componentUnderTest.ngOnInit();
      tick();
    }));

    Then(() => {
      console.log('componentUnderTest.llamas', componentUnderTest.llamas);
      expect(componentUnderTest.llamas.length).toBeGreaterThan(0);
      expect(frontServiceSpy.getFeaturedLlamas).toHaveBeenCalled();
    });
  });

  describe('Async', () => {

    When(fakeAsync(() => {
      componentUnderTest.async();
      tick();
    }));

    Then(() => {
      expect(componentUnderTest.isAsyncDone).toBe(true);
    });
  });

  describe('METHOD: isListVisible', () => {
    When(() => {
      actualValue = componentUnderTest.isListVisible();
    });

    describe('there are llamas', () => {
      Given(() => {
        componentUnderTest.llamas = [{ name: 'Billy', imageFileName: 'fake.jpg' }];
      });
      Then(() => {
        expect(actualValue).toEqual(true);
      });
    });

    describe('no llamas', () => {
      Given(() => {
        componentUnderTest.llamas = [];
      });
      Then(() => {
        expect(actualValue).toEqual(false);
      });
    });
  });
});

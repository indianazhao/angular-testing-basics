import { ComponentFixture, TestBed } from '@angular/core/testing';

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
      frontServiceSpy.getFeaturedLlamas.and.returnValue([{ name: 'indi', imageFileName: 'fakeImage' }]);
    });
    When(() => {
      actualValue = componentUnderTest.ngOnInit();
    });

    Then(() => {
      expect(componentUnderTest.llamas.length).toBeGreaterThan(0);
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

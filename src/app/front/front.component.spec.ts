import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontComponent } from './front.component';
import { FrontService } from './front.service';

describe('FrontComponent', () => {
  let componentUnderTest: FrontComponent;
  let actualValue: any;
  let frontServiceSpy: jasmine.SpyObj<FrontService>;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        FrontComponent,
        {
          provide: FrontService,
          useValue: jasmine.createSpyObj(
            'frontServiceSpy',
            {
              getFeaturedLlamas: [{name: 'indi', imageFileName: 'fakeImage'}]
            }
          )
        }
      ]
    });

    componentUnderTest = TestBed.inject(FrontComponent);
    frontServiceSpy = TestBed.inject(FrontService) as jasmine.SpyObj<FrontService>;
  });

  describe('INIT', () => {
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

import { RouterAdapterService } from './../_service/router-adapter/router-adapter.service';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FrontComponent } from './front.component';
import { FrontService } from './front.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

describe('FrontComponent', () => {
  let componentUnderTest: FrontComponent;
  let actualValue: any;
  let frontServiceSpy: Spy<FrontService>;
  let routerSpy: Spy<RouterAdapterService>;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        FrontComponent,
        {
          provide: FrontService,
          useValue: createSpyFromClass(FrontService)
        },
        {
          provide: RouterAdapterService,
          useValue: createSpyFromClass(RouterAdapterService)
        }
      ]
    });

    componentUnderTest = TestBed.inject(FrontComponent);
    frontServiceSpy = TestBed.inject(FrontService) as Spy<FrontService>;
    routerSpy = TestBed.inject(RouterAdapterService) as Spy<RouterAdapterService>;
  });

  describe('INIT', () => {
    Given(() => {
      frontServiceSpy.getFeaturedLlamas.mustBeCalledWith({ newest: true }).resolveWith(
        [{ name: 'indi', imageFileName: 'fakeImage' }]
      );
    });

    When(fakeAsync(() => {
      componentUnderTest.ngOnInit();
      tick();
    }));

    Then(() => {
      console.log('componentUnderTest.llamas', componentUnderTest.llamas);
      expect(componentUnderTest.llamas?.length).toBeGreaterThan(0);
      // expect(frontServiceSpy.getFeaturedLlamas).toHaveBeenCalledWith({newest: true});
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

  describe('METHOD: goToLlamaPage', () => {
    let fakeLlamaId: string;
    Given(() => {
      fakeLlamaId = 'Fake Id';
    });

    When(() => {
      componentUnderTest.goToLlamaPage(fakeLlamaId);
    });

    Then(() => {
      expect(routerSpy.goToUrl).toHaveBeenCalledWith(`/llama/${fakeLlamaId}`);
    });
  });
});

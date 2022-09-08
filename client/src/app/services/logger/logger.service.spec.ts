import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

// notes:
// spyOn() is a Jasmine function that allows you to spy on an existing method on an object.
// jasmine.createSpy() is a Jasmine function that creates a new spy object.
// jasmine.createSpyObj() is a Jasmine function that creates a new spy object with multiple methods.

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log', () => {
    service.log(['hello'])
  })
});

import { TestBed } from '@angular/core/testing';

import { Today } from './today';

describe('Today', () => {
  let service: Today;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Today);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

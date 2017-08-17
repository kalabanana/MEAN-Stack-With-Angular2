import { TestBed, inject } from '@angular/core/testing';

import { AllBookingService } from './all-booking.service';

describe('AllBookingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllBookingService]
    });
  });

  it('should be created', inject([AllBookingService], (service: AllBookingService) => {
    expect(service).toBeTruthy();
  }));
});

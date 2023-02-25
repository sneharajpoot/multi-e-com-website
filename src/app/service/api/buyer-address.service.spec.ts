import { TestBed } from '@angular/core/testing';

import { BuyerAddressService } from './buyer-address.service';

describe('BuyerAddressService', () => {
  let service: BuyerAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyerAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

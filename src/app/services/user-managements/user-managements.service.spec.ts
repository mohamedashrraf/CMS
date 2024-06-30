import { TestBed } from '@angular/core/testing';

import { UserManagementsService } from './user-managements.service';

describe('UserManagementsService', () => {
  let service: UserManagementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserManagementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ToggleDeleteModalService } from './toggle-delete-modal.service';

describe('ToggleDeleteModalService', () => {
  let service: ToggleDeleteModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleDeleteModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

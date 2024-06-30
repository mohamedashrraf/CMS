import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectchagesComponent } from './correctchages.component';

describe('CorrectchagesComponent', () => {
  let component: CorrectchagesComponent;
  let fixture: ComponentFixture<CorrectchagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrectchagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorrectchagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetnewpasswordComponent } from './setnewpassword.component';

describe('SetnewpasswordComponent', () => {
  let component: SetnewpasswordComponent;
  let fixture: ComponentFixture<SetnewpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetnewpasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetnewpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastFailedComponent } from './toast-failed.component';

describe('ToastFailedComponent', () => {
  let component: ToastFailedComponent;
  let fixture: ComponentFixture<ToastFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastFailedComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ToastFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

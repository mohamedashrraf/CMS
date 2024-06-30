import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastSystemComponent } from './toast-system.component';

describe('ToastSystemComponent', () => {
  let component: ToastSystemComponent;
  let fixture: ComponentFixture<ToastSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastSystemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ToastSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectboxComponent } from './selectbox.component';

describe('SelectboxComponent', () => {
  let component: SelectboxComponent;
  let fixture: ComponentFixture<SelectboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

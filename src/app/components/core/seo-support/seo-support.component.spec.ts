import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeoSupportComponent } from './seo-support.component';

describe('SeoSupportComponent', () => {
  let component: SeoSupportComponent;
  let fixture: ComponentFixture<SeoSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeoSupportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeoSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

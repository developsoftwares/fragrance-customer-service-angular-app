import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FragranceDetailsComponent } from './fragrance-details.component';

describe('FragranceDetailsComponent', () => {
  let component: FragranceDetailsComponent;
  let fixture: ComponentFixture<FragranceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FragranceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FragranceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqSamplesForDispatchComponent } from './req-samples-for-dispatch.component';

describe('ReqSamplesForDispatchComponent', () => {
  let component: ReqSamplesForDispatchComponent;
  let fixture: ComponentFixture<ReqSamplesForDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqSamplesForDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqSamplesForDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

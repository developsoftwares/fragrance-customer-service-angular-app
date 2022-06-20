import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchNavComponent } from './dispatch-nav.component';

describe('DispatchNavComponent', () => {
  let component: DispatchNavComponent;
  let fixture: ComponentFixture<DispatchNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

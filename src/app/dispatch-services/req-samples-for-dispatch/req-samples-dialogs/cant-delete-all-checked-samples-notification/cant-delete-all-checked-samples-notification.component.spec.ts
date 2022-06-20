import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CantDeleteAllCheckedSamplesNotificationComponent } from './cant-delete-all-checked-samples-notification.component';

describe('CantDeleteAllCheckedSamplesNotificationComponent', () => {
  let component: CantDeleteAllCheckedSamplesNotificationComponent;
  let fixture: ComponentFixture<CantDeleteAllCheckedSamplesNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CantDeleteAllCheckedSamplesNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CantDeleteAllCheckedSamplesNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

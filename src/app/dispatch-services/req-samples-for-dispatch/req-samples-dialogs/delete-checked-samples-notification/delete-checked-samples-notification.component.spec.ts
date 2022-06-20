import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCheckedSamplesNotificationComponent } from './delete-checked-samples-notification.component';

describe('DeleteCheckedSamplesNotificationComponent', () => {
  let component: DeleteCheckedSamplesNotificationComponent;
  let fixture: ComponentFixture<DeleteCheckedSamplesNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCheckedSamplesNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCheckedSamplesNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

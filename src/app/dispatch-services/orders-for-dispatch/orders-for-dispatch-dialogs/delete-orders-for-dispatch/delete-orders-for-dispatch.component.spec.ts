import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOrdersForDispatchComponent } from './delete-orders-for-dispatch.component';

describe('DeleteOrdersForDispatchComponent', () => {
  let component: DeleteOrdersForDispatchComponent;
  let fixture: ComponentFixture<DeleteOrdersForDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteOrdersForDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOrdersForDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

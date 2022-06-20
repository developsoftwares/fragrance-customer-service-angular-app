import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersForDispatchComponent } from './orders-for-dispatch.component';

describe('OrdersForDispatchComponent', () => {
  let component: OrdersForDispatchComponent;
  let fixture: ComponentFixture<OrdersForDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersForDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersForDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

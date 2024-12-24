import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificPaymentHistoryComponent } from './specific-payment-history.component';

describe('SpecificPaymentHistoryComponent', () => {
  let component: SpecificPaymentHistoryComponent;
  let fixture: ComponentFixture<SpecificPaymentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificPaymentHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificPaymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

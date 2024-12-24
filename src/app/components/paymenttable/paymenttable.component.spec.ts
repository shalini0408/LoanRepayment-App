import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymenttableComponent } from './paymenttable.component';

describe('PaymenttableComponent', () => {
  let component: PaymenttableComponent;
  let fixture: ComponentFixture<PaymenttableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymenttableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymenttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

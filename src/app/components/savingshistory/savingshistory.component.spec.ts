import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingshistoryComponent } from './savingshistory.component';

describe('SavingshistoryComponent', () => {
  let component: SavingshistoryComponent;
  let fixture: ComponentFixture<SavingshistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavingshistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavingshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

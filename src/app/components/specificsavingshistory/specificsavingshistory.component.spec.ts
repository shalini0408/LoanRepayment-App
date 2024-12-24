import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificsavingshistoryComponent } from './specificsavingshistory.component';

describe('SpecificsavingshistoryComponent', () => {
  let component: SpecificsavingshistoryComponent;
  let fixture: ComponentFixture<SpecificsavingshistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificsavingshistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificsavingshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

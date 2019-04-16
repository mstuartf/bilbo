import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotDepositDayPopupComponent } from './pot-deposit-day-popup.component';

describe('PotDepositDayPopupComponent', () => {
  let component: PotDepositDayPopupComponent;
  let fixture: ComponentFixture<PotDepositDayPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotDepositDayPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotDepositDayPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

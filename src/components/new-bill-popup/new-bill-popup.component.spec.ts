import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBillPopupComponent } from './new-bill-popup.component';

describe('NewBillPopupComponent', () => {
  let component: NewBillPopupComponent;
  let fixture: ComponentFixture<NewBillPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBillPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBillPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

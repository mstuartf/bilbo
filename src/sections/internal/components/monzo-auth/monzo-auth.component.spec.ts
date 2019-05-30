import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonzoAuthComponent } from './monzo-auth.component';

describe('MonzoAuthComponent', () => {
  let component: MonzoAuthComponent;
  let fixture: ComponentFixture<MonzoAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonzoAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonzoAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

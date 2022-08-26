import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneSondageComponent } from './one-sondage.component';

describe('OneSondageComponent', () => {
  let component: OneSondageComponent;
  let fixture: ComponentFixture<OneSondageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneSondageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneSondageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

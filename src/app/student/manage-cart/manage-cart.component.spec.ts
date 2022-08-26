import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCartComponent } from './manage-cart.component';

describe('ManageCartComponent', () => {
  let component: ManageCartComponent;
  let fixture: ComponentFixture<ManageCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

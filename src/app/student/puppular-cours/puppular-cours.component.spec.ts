import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuppularCoursComponent } from './puppular-cours.component';

describe('PuppularCoursComponent', () => {
  let component: PuppularCoursComponent;
  let fixture: ComponentFixture<PuppularCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuppularCoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuppularCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

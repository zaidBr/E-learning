import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestTeacherComponent } from './best-teacher.component';

describe('BestTeacherComponent', () => {
  let component: BestTeacherComponent;
  let fixture: ComponentFixture<BestTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

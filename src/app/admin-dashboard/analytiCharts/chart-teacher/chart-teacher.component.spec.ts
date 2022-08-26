import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTeacherComponent } from './chart-teacher.component';

describe('ChartTeacherComponent', () => {
  let component: ChartTeacherComponent;
  let fixture: ComponentFixture<ChartTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

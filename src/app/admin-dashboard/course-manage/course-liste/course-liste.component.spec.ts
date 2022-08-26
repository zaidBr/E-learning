import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListeComponent } from './course-liste.component';

describe('CourseListeComponent', () => {
  let component: CourseListeComponent;
  let fixture: ComponentFixture<CourseListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

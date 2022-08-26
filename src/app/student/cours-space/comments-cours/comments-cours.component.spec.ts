import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsCoursComponent } from './comments-cours.component';

describe('CommentsCoursComponent', () => {
  let component: CommentsCoursComponent;
  let fixture: ComponentFixture<CommentsCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsCoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

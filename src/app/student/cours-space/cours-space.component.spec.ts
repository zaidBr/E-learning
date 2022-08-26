import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursSpaceComponent } from './cours-space.component';

describe('CoursSpaceComponent', () => {
  let component: CoursSpaceComponent;
  let fixture: ComponentFixture<CoursSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

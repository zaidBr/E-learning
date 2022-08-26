import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideCoursComponent } from './inside-cours.component';

describe('InsideCoursComponent', () => {
  let component: InsideCoursComponent;
  let fixture: ComponentFixture<InsideCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsideCoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursContentComponent } from './cours-content.component';

describe('CoursContentComponent', () => {
  let component: CoursContentComponent;
  let fixture: ComponentFixture<CoursContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

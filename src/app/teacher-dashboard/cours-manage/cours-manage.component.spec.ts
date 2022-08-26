import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursManageComponent } from './cours-manage.component';

describe('CoursManageComponent', () => {
  let component: CoursManageComponent;
  let fixture: ComponentFixture<CoursManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

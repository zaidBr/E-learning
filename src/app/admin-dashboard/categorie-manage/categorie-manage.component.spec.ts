import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieManageComponent } from './categorie-manage.component';

describe('CategorieManageComponent', () => {
  let component: CategorieManageComponent;
  let fixture: ComponentFixture<CategorieManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

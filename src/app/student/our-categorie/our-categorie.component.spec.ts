import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurCategorieComponent } from './our-categorie.component';

describe('OurCategorieComponent', () => {
  let component: OurCategorieComponent;
  let fixture: ComponentFixture<OurCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurCategorieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

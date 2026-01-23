import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPie } from './category-pie';

describe('CategoryPie', () => {
  let component: CategoryPie;
  let fixture: ComponentFixture<CategoryPie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryPie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryPie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

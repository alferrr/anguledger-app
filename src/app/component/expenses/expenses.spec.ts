import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesTable } from './expenses';

describe('Expenses', () => {
  let component: ExpensesTable;
  let fixture: ComponentFixture<ExpensesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesTable],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

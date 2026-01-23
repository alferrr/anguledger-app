import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseChartComponent } from './expense-line-chart';

describe('ExpenseLineChart', () => {
  let component: ExpenseChartComponent;
  let fixture: ComponentFixture<ExpenseChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

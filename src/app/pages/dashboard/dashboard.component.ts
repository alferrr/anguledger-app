import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { QuickAddComponent } from '../../components/QuickAdd/form.component';
import { ExpensesTable } from '../../components/expenses/expenses';
import { ExpenseChartComponent } from '../../components/expense-line-chart/expense-line-chart';
import { ExpenseService } from '../../services/expense.service';
import { CategoryPie } from '../../components/category-pie/category-pie';
import { Budget } from '../../components/budget/budget';
import { BudgetService } from '../../services/budget.service';
import { BudgetFormComponent } from '../../components/budget/form/form';

import { Maintenance } from '../../components/maintenance/maintenance';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [
    QuickAddComponent,
    ExpensesTable,
    ExpenseChartComponent,
    CategoryPie,
    Budget,
    BudgetFormComponent,
    Maintenance,
    RouterLink,
  ],
})
export class DashboardComponent {
  constructor(
    private expenseService: ExpenseService,
    public budget: BudgetService,
  ) {}
  selectedDays = 3;

  changeRange(days: number) {
    this.selectedDays = days;
  }

  get totalExpenses(): number {
    return this.expenseService.getTotalForLastDays(this.selectedDays);
  }

  setBudget(amount: number) {
    this.budget.setBudget(amount);
  }

  resetBudget() {
    this.budget.setBudget(0);
  }
}

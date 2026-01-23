import { Injectable } from '@angular/core';
import { ExpenseService } from './expense.service';

const BUDGET_KEY = 'anguledger_budget';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  private budget = 0;

  constructor(private expenseService: ExpenseService) {
    const saved = localStorage.getItem(BUDGET_KEY);
    this.budget = saved ? +saved : 0;
  }

  setBudget(amount: number) {
    this.budget = amount;
    localStorage.setItem(BUDGET_KEY, amount.toString());
  }

  getBudget(): number {
    return this.budget;
  }

  getSpentThisMonth(): number {
    return this.expenseService.getTotalForLastDays(30);
  }

  getRemaining(): number {
    return this.getBudget() - this.getSpentThisMonth();
  }

  isOverBudget(): boolean {
    return this.getRemaining() < this.budget * 0.05;
  }

  isAlmost(): boolean {
    return this.getRemaining() <= this.budget * 0.3 && this.getRemaining() > this.budget * 0.05;
  }

  safe(): boolean {
    return this.getRemaining() > this.budget * 0.2;
  }
}

import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';
import { ExpenseService } from './expense.service';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private expenseService: ExpenseService) {}

  getCategoryTotalsForLastDays(days: number): Record<string, number> {
    const expenses = this.expenseService.getExpensesByLastDays(days);

    return expenses.reduce(
      (acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  getTotalForLastDays(days: number): number {
    return this.expenseService
      .getExpensesByLastDays(days)
      .reduce((sum, expense) => sum + expense.amount, 0);
  }

  getDailyTotals(days: number): Record<string, number> {
    const expenses = this.expenseService.getExpensesByLastDays(days);

    return expenses.reduce(
      (acc, expense) => {
        const day = expense.date.split('T')[0];
        acc[day] = (acc[day] || 0) + expense.amount;
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  getDailyTotalsFilled(days: number): Record<string, number> {
    const expenses = this.expenseService.getExpensesByLastDays(days);
    const result: Record<string, number> = {};

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      result[key] = 0;
    }

    for (const e of expenses) {
      const key = e.date.split('T')[0];
      result[key] += e.amount;
    }

    return result;
  }

  getTotalBetween(start: Date, end: Date): number {
    return this.expenseService
      .getAll()
      .filter((e) => {
        const d = new Date(e.date);
        return d >= start && d <= end;
      })
      .reduce((sum, e) => sum + e.amount, 0);
  }

  getRecent(limit = 5): Expense[] {
    return [...this.expenseService.getAll()]
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
      .slice(0, limit);
  }

  getHighestExpense(days?: number): Expense | null {
    const list = days
      ? this.expenseService.getExpensesByLastDays(days)
      : this.expenseService.getAll();

    return list.length
      ? list.reduce((max: Expense, e: Expense) => (e.amount > max.amount ? e : max), list[0])
      : null;
  }

  getInsights(days: number): string[] {
    const insights: string[] = [];
    const total = this.getTotalForLastDays(days);
    const categories = this.getCategoryTotalsForLastDays(days);

    const top = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];
    if (top) insights.push(`Most spending was on ${top[0]}`);

    if (total > 0) insights.push(`You spent ₱${total.toFixed(2)} in the last ${days} days`);

    return insights;
  }
}

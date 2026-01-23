import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';

const STORAGE_KEY = 'anguledger_expenses';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private expenses: Expense[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const data = localStorage.getItem(STORAGE_KEY);
    this.expenses = data ? JSON.parse(data) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.expenses));
    location.reload();
  }

  getAll(): Expense[] {
    return [...this.expenses];
  }

  add(expense: Expense) {
    this.expenses.unshift(expense);
    this.save();
  }

  update(updated: Expense) {
    this.expenses = this.expenses.map((e) => (e.id === updated.id ? updated : e));
    this.save();
  }

  delete(id: string) {
    this.expenses = this.expenses.filter((e) => e.id !== id);
    this.save();
  }

  clear() {
    this.expenses = [];
    this.save();
  }

  getCategoryTotalsForLastDays(days: number): Record<string, number> {
    const expenses = this.getExpensesByLastDays(days);

    return expenses.reduce(
      (acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  getTotalsForLastDays(days: number) {
    const expenses = this.getExpensesByLastDays(days);

    return expenses.reduce(
      (acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  getTotalForLastDays(days: number): number {
    return this.getExpensesByLastDays(days).reduce((sum, expense) => sum + expense.amount, 0);
  }

  getExpensesByLastDays(days: number) {
    const start = new Date();
    start.setDate(start.getDate() - days);
    start.setHours(0, 0, 0, 0);

    return this.getAll().filter((expense) => {
      const date = new Date(expense.date);
      return date >= start;
    });
  }

  getDailyTotals(days: number) {
    const expenses = this.getExpensesByLastDays(days);

    return expenses.reduce(
      (acc, expense) => {
        const day = expense.date.split('T')[0]; // YYYY-MM-DD
        acc[day] = (acc[day] || 0) + expense.amount;
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  getDailyTotalsFilled(days: number) {
    const expenses = this.getExpensesByLastDays(days);
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
}

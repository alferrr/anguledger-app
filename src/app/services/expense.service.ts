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
}

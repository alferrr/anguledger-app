import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { CommonModule } from '@angular/common';
import { matDelete } from '@ng-icons/material-icons/baseline';
import { provideIcons, NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './expenses.html',
  styleUrl: './expenses.scss',

  viewProviders: [
    provideIcons({
      matDelete,
    }),
  ],
})
export class ExpensesTable implements OnInit {
  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenses = this.expenseService.getAll();
  }

  deleteExpense(id: string): void {
    this.expenseService.delete(id);
    this.loadExpenses();
  }

  getTotal(): number {
    return this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}

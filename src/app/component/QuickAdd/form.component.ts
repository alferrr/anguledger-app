import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.scss',
})
export class QuickAddComponent {
  expenseCategories = [
    { id: 1, name: 'Food & Drinks' },
    { id: 2, name: 'Transport' },
    { id: 3, name: 'Housing' },
    { id: 4, name: 'Entertainment' },
    { id: 5, name: 'Shopping' },
    { id: 6, name: 'Health' },
    { id: 7, name: 'Miscellaneous' },
  ];

  selectedCategory: string = this.expenseCategories[0].name;
  amount: number = 0;
  name: string = '';

  constructor(private expenseService: ExpenseService) {}

  onSubmit(): void {
    // Validate the amount
    if (!this.amount || this.amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    // Create new expense object
    const newExpense: Expense = {
      id: this.generateId(),
      name: this.name,
      amount: this.amount,
      category: this.selectedCategory,
      date: new Date().toISOString(),
    };

    // Add expense using the service
    this.expenseService.add(newExpense);

    // Reset form
    this.resetForm();

    // Optional: Show success message
    console.log('Expense added successfully!');
  }

  private resetForm(): void {
    this.amount = 0;
    this.selectedCategory = this.expenseCategories[0].name;
    this.name = '';
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}

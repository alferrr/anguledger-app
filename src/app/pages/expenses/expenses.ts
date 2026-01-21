import { Component } from '@angular/core';
import { ExpensesTable } from '../../component/expenses/expenses';

@Component({
  selector: 'expenses',
  standalone: true,
  imports: [ExpensesTable],
  templateUrl: './expenses.html',
  styleUrl: './expenses.scss',
})
export class Expenses {}

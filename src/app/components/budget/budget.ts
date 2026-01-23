import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BudgetService } from '../../services/budget.service';
import { BudgetFormComponent } from './form/form';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './budget.html',
  styleUrl: './budget.scss',
})
export class Budget {
  amount = 0;

  constructor(public budget: BudgetService) {}
}

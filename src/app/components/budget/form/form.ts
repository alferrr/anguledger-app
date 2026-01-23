import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class BudgetFormComponent {
  amount = 0;

  @Output() saveBudget = new EventEmitter<number>();
  @Output() resetBudget = new EventEmitter<void>();

  submit() {
    if (this.amount <= 0) return;
    this.saveBudget.emit(this.amount);
    this.amount = 0;
  }

  clear() {
    this.amount = 0;
    this.resetBudget.emit();
  }
}

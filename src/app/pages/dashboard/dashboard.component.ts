import { Component } from '@angular/core';
import { QuickAddComponent } from '../../component/QuickAdd/form.component';
import { ExpensesTable } from '../../component/expenses/expenses';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [QuickAddComponent, ExpensesTable],
})
export class DashboardComponent {}

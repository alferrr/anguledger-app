import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Expenses } from './pages/expenses/expenses';
import { Reports } from './pages/reports/reports';
import { Settings } from './pages/about/settings';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'expenses', component: Expenses },
  { path: 'reports', component: Reports },
  { path: 'about', component: Settings },
];

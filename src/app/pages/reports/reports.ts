import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/reports.service';
import { Expense } from '../../models/expense.model';
import { CommonModule } from '@angular/common';
import { CategoryPie } from '../../components/category-pie/category-pie';
import { ExpenseChartComponent } from '../../components/expense-line-chart/expense-line-chart';
import { Chart, Legend, plugins } from 'chart.js';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss'],
  imports: [CommonModule, CategoryPie, ExpenseChartComponent],
  standalone: true,
})
export class Reports implements OnInit {
  totalSpent = 0;
  dailyAvg = 0;
  topCategory = '';
  highestExpense: Expense | null = null;
  recentExpenses: Expense[] = [];
  insights: string[] = [];
  categoryDetails: { name: string; total: number; percent: number }[] = [];

  rangeDays = 7;

  constructor(
    private reportService: ReportService,
    private expenseService: ExpenseService,
  ) {}

  ngOnInit() {
    this.updateData();
  }

  selectedDays = 7;

  changeRange(days: number) {
    this.selectedDays = days;
  }

  setRange(range: 'week' | 'month' | '30days') {
    if (range === 'week') this.rangeDays = 3;
    if (range === 'month') this.rangeDays = 7;
    if (range === '30days') this.rangeDays = 30;
    this.updateData();
  }

  updateData() {
    this.totalSpent = this.reportService.getTotalForLastDays(this.rangeDays);
    this.dailyAvg = this.reportService.getTotalForLastDays(this.rangeDays) / this.rangeDays;
    this.highestExpense = this.reportService.getHighestExpense(this.rangeDays);
    this.recentExpenses = this.reportService.getRecent(5);
    this.insights = this.reportService.getInsights(this.rangeDays);

    // Category details + percentages
    const categories = this.reportService.getCategoryTotalsForLastDays(this.rangeDays);
    const total = Object.values(categories).reduce((a, b) => a + b, 0);
    this.categoryDetails = Object.entries(categories).map(([name, totalCat]) => ({
      name,
      total: totalCat,
      percent: (totalCat / total) * 100,
    }));

    const top = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];
    this.topCategory = top ? top[0] : '—';
  }
}

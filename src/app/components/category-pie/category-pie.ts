import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-category-pie',
  standalone: true,
  templateUrl: './category-pie.html',
})
export class CategoryPie implements AfterViewInit, OnChanges {
  @Input() days = 3;

  chart!: Chart;

  constructor(private expenseService: ExpenseService) {}

  ngAfterViewInit() {
    this.createChart(this.days);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['days'] && this.chart) {
      this.updateChart(this.days);
    }
  }

  private createChart(days: number) {
    const totals = this.expenseService.getCategoryTotalsForLastDays(days);

    this.chart = new Chart('categoryPieChart', {
      type: 'pie',
      data: {
        labels: Object.keys(totals),
        datasets: [
          {
            data: Object.values(totals),
            backgroundColor: ['#02ffb2', '#60a5fa', '#f472b6', '#facc15', '#fb7185', '#a78bfa'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
            },
          },
        },
      },
    });
  }

  private updateChart(days: number) {
    const totals = this.expenseService.getCategoryTotalsForLastDays(days);

    this.chart.data.labels = Object.keys(totals);
    this.chart.data.datasets[0].data = Object.values(totals);
    this.chart.update();
  }
}

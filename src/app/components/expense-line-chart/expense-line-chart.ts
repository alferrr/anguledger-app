import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-chart',
  standalone: true,
  templateUrl: './expense-line-chart.html',
})
export class ExpenseChartComponent implements AfterViewInit, OnChanges {
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
    const totals = this.expenseService.getDailyTotalsFilled(days);

    const canvas = document.getElementById('expenseChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const gradient = ctx!.createLinearGradient(0, 0, 0, 400);

    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.17)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    this.chart = new Chart('expenseChart', {
      type: 'line',
      data: {
        labels: Object.keys(totals),
        datasets: [
          {
            label: 'Expenses',
            data: Object.values(totals),
            borderColor: '#02ffb2',
            backgroundColor: gradient,
            pointBackgroundColor: '#02ffb2',
            pointBorderColor: '#ffffff',
            pointRadius: 4,
            tension: 0.35,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            ticks: { maxRotation: 0 },
          },
        },
        animations: {
          tension: {
            duration: 1000,
            easing: 'easeOutQuart',
            from: 0.5,
            to: 0.35,
          },
          y: {
            duration: 1000,
            from: 0,
          },
        },
      },
    });
  }

  private updateChart(days: number) {
    const totals = this.expenseService.getDailyTotalsFilled(days);

    this.chart.data.labels = Object.keys(totals);
    this.chart.data.datasets[0].data = Object.values(totals);
    this.chart.update();
  }
}

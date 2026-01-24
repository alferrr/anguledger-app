import { Component, Input, OnChanges } from '@angular/core';
import { ReportService } from '../../services/reports.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insight',
  templateUrl: './insight.html',
  styleUrl: './insight.scss',
  imports: [CommonModule],
  standalone: true,
})
export class Insights implements OnChanges {
  constructor(private reportService: ReportService) {}

  @Input() days = 3;
  insights: string[] = [];

  ngOnChanges() {
    this.insights = this.reportService.getInsights(this.days);
  }
}

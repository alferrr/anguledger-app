import { Component } from '@angular/core';
import { Maintenance } from '../../components/maintenance/maintenance';
@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [Maintenance],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
})
export class Reports {}

import { Component } from '@angular/core';
import { Maintenance } from '../../components/maintenance/maintenance';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [Maintenance],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {}

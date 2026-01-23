import { Component } from '@angular/core';
import { matConstruction } from '@ng-icons/material-icons/baseline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.scss',

  viewProviders: [
    provideIcons({
      matConstruction,
    }),
  ],
})
export class Maintenance {}

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

import { matDashboardOutline } from '@ng-icons/material-icons/outline';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',

  viewProviders: [
    provideIcons({
      matDashboardOutline,
    }),
  ],
})
export class Sidebar {}

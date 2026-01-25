import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Sidebar } from './components/Sidebar/sidebar.component'; // adjust path as needed
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matDashboard,
  matAttachMoney,
  matBarChart,
  matSettings,
  matInfo,
} from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidebar, NgIconComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',

  viewProviders: [
    provideIcons({
      matDashboard,
      matAttachMoney,
      matBarChart,
      matSettings,
      matInfo,
    }),
  ],
})
export class AppComponent {
  title = 'anguledger';
}

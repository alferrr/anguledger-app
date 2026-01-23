import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Sidebar } from './components/Sidebar/sidebar.component'; // adjust path as needed
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matDashboard,
  matAttachMoney,
  matBarChart,
  matSettings,
} from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidebar, NgIconComponent, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss',

  viewProviders: [
    provideIcons({
      matDashboard,
      matAttachMoney,
      matBarChart,
      matSettings,
    }),
  ],
})
export class AppComponent {
  title = 'anguledger';
}

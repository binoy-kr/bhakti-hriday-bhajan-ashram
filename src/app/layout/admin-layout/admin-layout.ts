import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, AdminSidebar],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout {
  readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
}

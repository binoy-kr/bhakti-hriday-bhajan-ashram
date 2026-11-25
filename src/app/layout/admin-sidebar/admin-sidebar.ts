import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-admin-sidebar',
  imports: [RouterLink, RouterLinkActive, Logo],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.scss'
})
export class AdminSidebar {}

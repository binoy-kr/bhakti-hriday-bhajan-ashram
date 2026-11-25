import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Logo } from '../../shared/logo/logo';
import { SiteContentService } from '../../service/site-content.service';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, RouterLink, Logo],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss'
})
export class AuthLayout {
  readonly heroImage = inject(SiteContentService).heroImage;
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Preloader } from './shared/preloader/preloader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Preloader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}

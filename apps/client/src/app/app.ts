import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main class="flex-grow"><router-outlet></router-outlet></main>
    <footer class="bg-gray-800 text-white p-6 mt-auto">
      <div class="container mx-auto text-center">
        &copy; {{ currentYear }} My E-commerce. All rights reserved.
      </div>
    </footer>
  `,
  styles: [
    `
      :host {
        font-family: sans-serif;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
    `,
  ],
})
export class App {
  protected title = 'client';
  currentYear: number = new Date().getFullYear();
}

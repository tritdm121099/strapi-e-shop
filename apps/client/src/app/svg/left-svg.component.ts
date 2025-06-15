import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-svg-left',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="width()"
      [attr.height]="height()"
      viewBox="0 0 24 24"
      fill="none"
      [attr.stroke]="color()"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 6l-6 6l6 6" />
    </svg>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class SvgLeft {
  width = input(24);
  height = input(24);
  color = input('currentColor');
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-career-detail-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container-main py-12">
      <h1 class="text-3xl font-bold">career-detail-page placeholder</h1>
    </div>
  `
})
export class CareerDetailPageComponent {}

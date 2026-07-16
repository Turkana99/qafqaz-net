import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-service-detail-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container-main py-12">
      <h1 class="text-3xl font-bold">service-detail-page placeholder</h1>
    </div>
  `
})
export class ServiceDetailPageComponent {}

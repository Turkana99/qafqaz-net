import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-products-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container-custom py-12">
      <h1 class="text-3xl font-bold">products-page placeholder</h1>
    </div>
  `
})
export class ProductsPageComponent {}

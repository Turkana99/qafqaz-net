import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-blogs-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container-main py-12">
      <h1 class="text-3xl font-bold">blogs-page placeholder</h1>
    </div>
  `
})
export class BlogsPageComponent {}

$pages = @(
  "home\pages\home-page",
  "services\pages\services-page",
  "services\pages\service-detail-page",
  "products\pages\products-page",
  "company\pages\company-page",
  "blogs\pages\blogs-page",
  "blogs\pages\blog-detail-page",
  "careers\pages\careers-page",
  "careers\pages\career-detail-page",
  "contact\pages\contact-page",
  "not-found\pages\not-found-page"
)

foreach ($p in $pages) {
  $parts = $p -split "\\"
  $name = $parts[-1]
  $className = ($name -split "-" | ForEach-Object { $_.Substring(0,1).ToUpper() + $_.Substring(1) }) -join "" + "Component"
  
  $content = @"
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-$name',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div class="container-custom py-12">
      <h1 class="text-3xl font-bold">$name placeholder</h1>
    </div>
  \`
})
export class $className {}
"@
  
  $path = "src\app\features\$p\$name.component.ts"
  New-Item -ItemType File -Force -Path $path -Value $content | Out-Null
}

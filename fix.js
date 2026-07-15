const fs = require('fs');

// 1. Fix ButtonComponent
let buttonPath = 'src/app/shared/ui/button/button.component.ts';
let buttonContent = fs.readFileSync(buttonPath, 'utf8');
buttonContent = buttonContent.replace(/return \\`\\\$\{(.*?)\\`.trim\(\);/s, "return `${base} ${variantClass} ${sizeClass} ${disabledClass} ${this.customClass()}`.trim();");
fs.writeFileSync(buttonPath, buttonContent);

// 2. Fix placeholders
const pages = [
  "services/pages/services-page",
  "services/pages/service-detail-page",
  "products/pages/products-page",
  "company/pages/company-page",
  "blogs/pages/blogs-page",
  "blogs/pages/blog-detail-page",
  "careers/pages/careers-page",
  "careers/pages/career-detail-page",
  "contact/pages/contact-page",
  "not-found/pages/not-found-page"
];

pages.forEach(p => {
  const parts = p.split("/");
  const name = parts[parts.length - 1];
  const className = name.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join("") + "Component";
  
  const content = `import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-${name}',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div class="container-custom py-12">
      <h1 class="text-3xl font-bold">${name} placeholder</h1>
    </div>
  \`
})
export class ${className} {}
`;
  
  const filePath = `src/app/features/${p}/${name}.component.ts`;
  fs.writeFileSync(filePath, content);
});

// 3. Fix home-page.component.ts
let homePath = 'src/app/features/home/pages/home-page/home-page.component.ts';
let homeContent = fs.readFileSync(homePath, 'utf8');
homeContent = homeContent.replace(/\.\.\/components/g, '../../components');
fs.writeFileSync(homePath, homeContent);

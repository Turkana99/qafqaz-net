import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonComponent} from '../../../../shared/ui/button/button.component';
import {IconComponent} from '../../../../shared/ui/icon/icon.component';
import {RevealDirective} from '../../../../shared/ui/reveal/reveal.directive';

interface HeroFeature {
    icon: string;
    text: string;
}

@Component({
    selector: 'app-hero-section',
    standalone: true,
    imports: [
        ButtonComponent, IconComponent, RouterLink, RevealDirective
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="relative bg-primary-navy overflow-hidden min-h-screen flex items-center pt-28 lg:pt-32 pb-16 lg:pb-20 bg-cover bg-center" style="background-image: url('assets/backgrounds/hero-bg.png');">
      <!-- Dark overlay to ensure text readability if image is too bright -->
      <div class="absolute inset-0 bg-primary-navy/40 z-0"></div>
      
      <div class="container-main relative z-20 w-full h-full flex flex-col justify-center">
        <!-- Text Content -->
        <div class="flex flex-col text-white max-w-[800px] items-start text-left">
           <h1 appReveal revealDirection="left" [revealDelay]="100" class="font-bdo font-semibold text-[32px] sm:text-[44px] md:text-[52px] lg:text-[64px] leading-[1.18] lg:leading-[83px] tracking-[-0.03em] align-middle uppercase text-left">
             SİZİN <span style="background: linear-gradient(90deg, #18E792 25.31%, #0000FE 113.05%); background-clip: text; -webkit-background-clip: text; color: transparent; -webkit-text-fill-color: transparent;">ETİBARLI</span><br class="hidden sm:block"/>
             İT TƏRƏFDAŞINIZ
           </h1>
           
           <p appReveal revealDirection="left" [revealDelay]="250" class="font-bdo font-normal text-[16px] sm:text-[18px] leading-[26px] sm:leading-[30px] tracking-normal text-hero-description max-w-[500px] mt-4 sm:mt-6 text-left">
             Biznesinizi inkişaf etdirmək üçün <span class="hero-highlight">effektiv</span> və <span class="hero-highlight">fərdi</span> İT həlləri təqdim edirik.
           </p>
           
           <!-- Feature list -->
           <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 sm:gap-y-6 mt-8 sm:mt-12 max-w-2xl w-full text-left">
             @for (feature of features; track feature.text; let i = $index) {
               <div appReveal revealDirection="left" [revealDelay]="400 + (i * 150)" class="flex items-center gap-[10px] justify-start text-left">
                 <div class="relative w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] shrink-0 rounded-xl flex items-center justify-center p-[12px] sm:p-[16px]" style="border: 1.5px solid transparent; background: linear-gradient(var(--color-navy), var(--color-navy)) padding-box, linear-gradient(225.68deg, #18E792 6.23%, #0000FE 93.74%) border-box; backdrop-filter: blur(50px);">
                   <app-icon [name]="feature.icon" [size]="24" class="text-white"></app-icon>
                 </div>
                 <span class="font-bdo font-normal text-[15px] sm:text-[16px] leading-[20px] tracking-normal text-white align-middle max-w-[220px] sm:max-w-[160px] text-left">{{ feature.text }}</span>
               </div>
             }
           </div>
           
           <div appReveal revealDirection="left" [revealDelay]="1000" class="mt-10 sm:mt-14 flex items-center w-full sm:w-auto justify-start self-start">
             <app-button variant="gradient" size="hero" routerLink="/services" trailingIcon="assets/icons/right.svg" customClass="w-full sm:w-[203px]">
               Ətraflı məlumat
             </app-button>
           </div>
        </div>
      </div>
    </section>
  `
})
export class HeroSectionComponent {
    features : readonly HeroFeature[] = [
        {
            icon: 'assets/icons/hugeicons_security-lock.svg',
            text: 'Sistemlərinizi qoruyuruq'
        }, {
            icon: 'assets/icons/lucide_chart-area.svg',
            text: 'Riskləri minimuma endiririk'
        }, {
            icon: 'assets/icons/lucide_clock-fading.svg',
            text: 'Fəaliyyətinizin fasiləsiz davamını təmin edirik'
        }, {
            icon: 'assets/icons/lucide_users-round.svg',
            text: 'Peşəkar komanda etibarlı dəstək'
        }
    ];
}

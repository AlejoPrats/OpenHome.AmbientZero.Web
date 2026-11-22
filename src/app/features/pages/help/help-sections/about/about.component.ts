import { Component } from '@angular/core';
import { TuiLink } from '@taiga-ui/core';
import { TechCredit } from 'app/shared/interfaces/tech-credit';

@Component({
  selector: 'app-about',
  imports: [TuiLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.less',
})
export class AboutComponent {
  protected readonly technologies: readonly TechCredit[] = [
    {
      name: 'Angular',
      url: 'https://angular.dev',
      logoPath: 'assets/logos/angular.png',
    },
    {
      name: 'Taiga UI',
      url: 'https://taiga-ui.dev',
      logoPath: 'assets/logos/taiga.svg',
    },
    {
      name: 'Apache ECharts',
      url: 'https://echarts.apache.org',
      logoPath: 'assets/logos/echarts.png',
      needsLightBg: true,
    },
    {
      name: 'driver.js',
      url: 'https://driverjs.com',
      logoPath: 'assets/logos/driverjs.png',
    },
    {
      name: 'Python',
      url: 'https://python.org',
      logoPath: 'assets/logos/python.png',
    },
    {
      name: 'C# / .NET',
      url: 'https://dotnet.microsoft.com/en-us/',
      logoPath: 'assets/logos/csharp.png',
    },
  ];
}

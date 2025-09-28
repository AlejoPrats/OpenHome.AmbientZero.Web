import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingIndicatorComponent } from "./loading-indicator/loading-indicator.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'abmbientZeroSite';

}

import { AsyncPipe, NgOptimizedImage, NgTemplateOutlet } from "@angular/common";
import { Component, ContentChild, Input, OnInit, TemplateRef } from "@angular/core";
import { Observable, tap } from "rxjs";
import { LoadingService } from "../services/loading.service";
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from "@angular/router";

@Component({
  selector: "loading-indicator",
  templateUrl: "./loading-indicator.component.html",
  styleUrls: ["./loading-indicator.component.css"],
  imports: [AsyncPipe, NgOptimizedImage],
  standalone: true,
})
export class LoadingIndicatorComponent implements OnInit {

  loading$: Observable<boolean>;

  @Input()
  detectRouteTransitions = false;

  @ContentChild("loading")
  customLoadingIndicator: TemplateRef<any> | null = null;

  ImagePath: string; 

  constructor(
  private loadingService: LoadingService, 
  private router: Router) {
    this.loading$ = this.loadingService.loading$;
    this.ImagePath = 'assets/images/282.gif';
  }

  ngOnInit() {
    if (this.detectRouteTransitions) {
      this.router.events
        .pipe(
          tap((event: any) => {
            if (event instanceof RouteConfigLoadStart) {
              this.loadingService.loadingOn();
            } else if (event instanceof RouteConfigLoadEnd) {
              this.loadingService.loadingOff();
            }
          })
        )
        .subscribe();
    }
  }
}

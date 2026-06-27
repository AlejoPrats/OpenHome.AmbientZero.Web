import { Component, HostListener, Input, OnChanges, OnDestroy, OnInit, signal, SimpleChanges } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';
import { TuiBadge } from "@taiga-ui/kit";

@Component({
  selector: 'app-scroll-indicator',
  imports: [TuiBadge],
  templateUrl: './scroll-indicator.component.html',
  styleUrl: './scroll-indicator.component.less',
})
export class ScrollIndicatorComponent {
  show = signal(false);
  private resizeObserver?: ResizeObserver;

  ngOnInit(): void {
    const root = document.documentElement;

    this.resizeObserver = new ResizeObserver(() => this.update(root));
    this.resizeObserver.observe(root);

    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.update(root);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    window.removeEventListener('scroll', this.onScroll);
  }

  private onScroll = () => this.update(document.documentElement);

  private update(root: HTMLElement): void {
    const scrollHeight = root.scrollHeight;
    const clientHeight = root.clientHeight;
    const scrollTop = window.scrollY;

    const hasScroll = scrollHeight > clientHeight + 1;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

    this.show.set(hasScroll && !atBottom);
  }

  scrollDown(): void {
    const root = document.documentElement;

    window.scrollTo({
      top: window.scrollY + root.clientHeight,
      behavior: 'smooth',
    });

    setTimeout(() => this.update(root), 400);
  }
}
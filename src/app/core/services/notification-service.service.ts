import { inject, Injectable } from '@angular/core';
import { TuiNotificationService } from '@taiga-ui/core';

export interface NotificationConfig {
  message: string;
  label: string;
  block?: 'end' | 'start' | undefined;
  inline?: 'end' | 'start' | 'center' | undefined;
  type?: 'info' | 'warning' | 'negative' | 'positive' | 'nautral' | undefined;
  duration?: number;
  closable?: boolean;
}

export interface MessageStep {
  DownRight(): OptionalStep;
  Duration(ms?: number): OptionalStep;
  NotificationType(type: 'info' | 'warning' | 'negative' | 'positive' | 'nautral'): OptionalStep;
  Closable(value?: boolean): OptionalStep;
  Show(): void;
}

export interface OptionalStep {
  DownRight(): OptionalStep;
  Duration(ms?: number): OptionalStep;
  NotificationType(type: 'info' | 'warning' | 'negative' | 'positive' | 'nautral'): OptionalStep;
  Closable(value?: boolean): OptionalStep;
  Show(): void;
}

export class NotificationBuilder implements MessageStep, OptionalStep {
  private config: NotificationConfig;

  constructor(
    private readonly service: NotificationService,
    private readonly tuiNotificationService: TuiNotificationService,
    message: string,
    label: string,
  ) {
    this.config = { message, label };
  }

  DownRight(): OptionalStep {
    this.config.block = 'end';
    this.config.inline = 'end';
    return this;
  }

  NotificationType(type: 'info' | 'warning' | 'negative' | 'positive' | 'nautral'): OptionalStep {
    this.config.type = type;
    return this;
  }

  Duration(ms: number = 3000): OptionalStep {
    this.config.duration = ms;
    return this;
  }

  Closable(value: boolean = true): OptionalStep {
    this.config.closable = value;
    return this;
  }

  Show(): void {
    this.tuiNotificationService
      .open(this.config.message, {
        label: this.config.label,
        appearance: this.config.type ?? 'neutral',
        block: this.config.block ?? 'end',
        inline: this.config.inline ?? 'end',
        autoClose: this.config.duration ?? 5000,
      })
      .subscribe();
  }
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private tuiNotificationService = inject(TuiNotificationService);
  Message(message: string, label: string): MessageStep {
    return new NotificationBuilder(this, this.tuiNotificationService, message, label);
  }
}

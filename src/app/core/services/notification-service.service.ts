import { inject, Injectable } from '@angular/core';
import { TuiNotificationService } from '@taiga-ui/core';

export interface NotificationConfig {
  message: string;
  label: string;
  block?: 'end' | 'start' | undefined;
  inline?: 'end' | 'start' | 'center' | undefined;
  type?: 'info' | 'warning' | 'negative' | 'positive' | 'neutral' | undefined;
  duration?: number;
  closable?: boolean;
}

export interface MessageStep {
  Duration(ms?: number): OptionalStep;
  Closable(value?: boolean): OptionalStep;
  Show(): void;
}

export interface PositionStep {
  BottomRight(): OptionalStep;
  BottomCenter(): OptionalStep;
  BottomLeft(): OptionalStep;
  TopRight(): OptionalStep;
  TopCenter(): OptionalStep;
  TopLeft(): OptionalStep;
}

export interface TypeStep {
  SuccessType(): PositionStep;
  ErrorType(): PositionStep;
  WarningType(): PositionStep;
  InformationType(): PositionStep;
  NeutralType(): PositionStep;
}

export interface OptionalStep {
  Duration(ms?: number): OptionalStep;
  Closable(value?: boolean): OptionalStep;
  Show(): void;
}

export class NotificationBuilder implements MessageStep, TypeStep, PositionStep, OptionalStep {
  private config: NotificationConfig;

  constructor(
    private readonly service: NotificationService,
    private readonly tuiNotificationService: TuiNotificationService,
    message: string,
    label: string,
  ) {
    this.config = { message, label };
  }

  //#region Notification Position

  BottomRight(): OptionalStep {
    this.config.block = 'end';
    this.config.inline = 'end';
    return this;
  }

  BottomCenter(): OptionalStep {
    this.config.block = 'end';
    this.config.inline = 'center';
    return this;
  }

  BottomLeft(): OptionalStep {
    this.config.block = 'end';
    this.config.inline = 'start';
    return this;
  }

  TopRight(): OptionalStep {
    this.config.block = 'start';
    this.config.inline = 'end';
    return this;
  }

  TopCenter(): OptionalStep {
    this.config.block = 'start';
    this.config.inline = 'center';
    return this;
  }

  TopLeft(): OptionalStep {
    this.config.block = 'start';
    this.config.inline = 'start';
    return this;
  }

  //#endregion

  //#region Notification Type

  SuccessType(): PositionStep {
    this.config.type = 'positive';
    return this;
  }

  ErrorType(): PositionStep {
    this.config.type = 'negative';
    return this;
  }

  WarningType(): PositionStep {
    this.config.type = 'warning';
    return this;
  }

  InformationType(): PositionStep {
    this.config.type = 'info';
    return this;
  }

  NeutralType(): PositionStep {
    this.config.type = 'neutral';
    return this;
  }

  //#endregion

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
  Message(message: string, label: string): TypeStep {
    return new NotificationBuilder(this, this.tuiNotificationService, message, label);
  }
}

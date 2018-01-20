import {
  Component,
  Output,
  ElementRef,
  ViewChild,
  EventEmitter,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-chat-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['chat-input.component.scss'],
  template: `
    <div class="chat-input">
      <mat-form-field class="field">
        <input #text #focus
          matInput
          type="text"
          placeholder="please enter your text here..."
          (keyup.enter)="send(text.value)"
          (input)="toggle(text.value)">
      </mat-form-field>

      <button mat-raised-button color="primary" [disabled]="disabled" class="submit" (click)="send(text.value)">Send</button>
    </div>
  `
})
export class ChatInputComponent implements AfterViewInit {
  @ViewChild('text') textRef: ElementRef;
  @ViewChild('focus') private focus: ElementRef;

  disabled = true;

  @Output() message = new EventEmitter<string>();

  constructor() {}

  // After view initialized, focus on chat message text input
  ngAfterViewInit() {
    this.focus.nativeElement.focus();
  }

  send(text) {
    if (text) {
      this.message.emit(text);
      this.disabled = true;
      this.textRef.nativeElement.value = '';
    }
  }

  toggle(text) {
    if (text) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }
}

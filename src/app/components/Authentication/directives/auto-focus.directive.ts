import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
  standalone: true
})
export class AutoFocusDirective {

  constructor() { }

  @HostListener('input', ['$event']) OnInput(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    if (input.value && input.nextElementSibling) {
      (input.nextElementSibling as HTMLInputElement).select();
      (input.nextElementSibling as HTMLInputElement).focus();
    }
  }
}

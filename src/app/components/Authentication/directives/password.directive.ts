import { Directive, ElementRef, EventEmitter, HostListener, Input, NgZone, Output } from '@angular/core';

@Directive({
  selector: '[appPassword]',
  standalone: true
})
export class PasswordDirective {
  private lastInputTime: number = 1000;
  private tempInput: string = '';
  private currentInput: string = '';
  private timeoutTemp: any = undefined;
  private timeoutFlag: boolean = false;

  @Input('appPassword') currentPasswordType!: boolean;
  @Output() onChangeInputValue = new EventEmitter<string>();

  constructor(private ele: ElementRef, private zone: NgZone) { }

  @HostListener('input', ['$event']) onInput(inputEvent: any) {

    const input = this.ele.nativeElement as HTMLInputElement;

    // Checking for the input event if it's delete to remove items form the text.
    if (inputEvent.inputType == "deleteContentBackward" || inputEvent.inputType == "deleteContentForward") {
      if (input.value.length >= 0) {
        this.currentInput = input.value.slice(0, input.value.length)
        this.onChangeInputValue.emit(this.currentInput)
      }
    } else {
      // Check in the second input to remove the timeout
      if (this.timeoutTemp) {
        clearTimeout(this.timeoutTemp);
        this.timeoutFlag = true;
        this.currentInput = this.currentInput.concat(input.value.slice(-1));
        input.value = this.currentInput;
        this.onChangeInputValue.emit(this.currentInput)
        input.type = 'text';
      }
      // will go in for the first input only
      if (!this.timeoutFlag) {
        this.currentInput = input.value;
      }

      // Will go in if the show password is not visiable (passwor is bullets)
      if (!this.currentPasswordType) {
        this.tempInput = '•'.repeat(input.value.length - 1);
        input.value = this.tempInput.concat(input.value.slice(-1)); // getting the last character in the input value and add it to the end of the text to be shown
        input.type = 'text';

        this.zone.runOutsideAngular(() => {
          this.timeoutTemp = setTimeout(() => {
            this.zone.run(() => {
              input.value = this.currentInput;
              this.onChangeInputValue.emit(this.currentInput)
              input.type = 'password';
            });
          }, this.lastInputTime);
        });
      }
    }
  }
}
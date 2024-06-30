import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggleFilter]',
  standalone: true
})

export class ToggleFilterDirective {

  @HostBinding('class.showFilter') isOpen: Boolean = false;

  @HostListener('click') toggleFilter() {
    this.isOpen = !this.isOpen;
  }

  constructor() { }

}

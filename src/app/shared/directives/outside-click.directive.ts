import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appOutsideClick]',
  standalone: true
})
export class OutsideClickDirective {
  constructor(
    private elRef: ElementRef,
    private render: Renderer2,
  ) { }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    // Find the nearest ancestor element with the 'opened' class
    const openedElement = this.findOpenedAncestor(clickedElement);

    if (openedElement) {
      // Set display: flex to the opened element and its children
      this.render.setStyle(openedElement, 'display', 'block');
    } else {
      // If no ancestor with 'opened' class is found, hide the element
      this.render.setStyle(this.elRef.nativeElement, 'display', 'none');
    }
  }

  private findOpenedAncestor(element: any): any {
    while (element) {
      if (element.classList.contains('opened')) {
        return element;
      }
      element = element.parentElement;
    }
    return null;
  }
}

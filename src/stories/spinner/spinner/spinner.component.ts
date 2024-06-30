import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent {

  @Input('backgroundColor') backgroundColor!: string;
  @ViewChild('loading') loading!: ElementRef;

  constructor() { }

  ngOnChanges(): void {
    this.loading.nativeElement.style.border = `6px solid ${this.backgroundColor}`;
    this.loading.nativeElement.style.borderTop = `6px solid rgba(6, 96, 252, 0.12)`;
  }

  ngAfterViewInit(): void {
    this.loading.nativeElement.style.border = `6px solid ${this.backgroundColor}`;
    this.loading.nativeElement.style.borderTop = `6px solid rgba(6, 96, 252, 0.12)`;
  }

}

import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-authButton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authslide.component.html',
  styleUrl: './authslide.component.css'
})
export class AuthSliderComponent implements OnInit {

  @Input('slides') slides!: string[];
  @Input('backgroundImg') backgroundImg!: string;
  @ViewChild('icon') icon!: ElementRef;
  slideIndex!: number;

  constructor() {
    this.slides = [
      'illustration-signup.png',
      'second-signup-img.svg',
    ]
    this.slideIndex = 0;
  }

  ngOnInit(): void { }

  ngOnChange() {
    this.icon.nativeElement.style.backgroundImage = `http://localhost:6006/assets/${this.backgroundImg}`;
    console.log(`http://localhost:6006/assets/${this.backgroundImg}`);
  }

  ngAfterViewInit(): void {
    this.icon.nativeElement.style.backgroundImage = `http://localhost:6006/assets/${this.backgroundImg}`;
    console.log(`http://localhost:6006/assets/${this.backgroundImg}`);
  }

  showSlides(i = this.slideIndex) {
    let silde = this.slides[i];
    return silde;
  }

  currentSlide(i: number) {
    this.slideIndex = i;
    return this.showSlides();
  }

}

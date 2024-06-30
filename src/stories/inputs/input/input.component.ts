import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements OnInit {

  inpTextForm!: ElementRef;
  @Input('inp') inp!: string;

  constructor() { }

  ngOnInit(): void { }

}

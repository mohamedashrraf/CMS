import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControlName, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './email.component.html',
  styleUrl: './email.component.css'
})
export class EmailInputComponent implements OnInit {

  inpTextForm!: FormGroup;
  @ViewChild('email') email!: FormControlName;
  @Input('inp') inp!: string;

  constructor() { }

  ngOnInit(): void { }

}

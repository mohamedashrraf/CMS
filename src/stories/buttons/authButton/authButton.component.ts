import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-authButton',
  standalone: true,
  imports: [],
  templateUrl: './authButton.component.html',
  styleUrl: './authButton.component.css'
})
export class AuthButtonComponent implements OnInit {

  @Input('label') label!: string;
  constructor() { }

  ngOnInit(): void { }

}

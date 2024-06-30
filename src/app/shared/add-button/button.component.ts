import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AddButtonComponent implements OnInit {

  @Input('btnName') btnName!: string;
  @Input('btnIcon') btnIcon!: string;
  @Output() onAddUser = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {

  }

  addNewUser() {
    this.onAddUser.emit();
  }
}

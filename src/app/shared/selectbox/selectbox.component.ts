import { Component, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-selectbox',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './selectbox.component.html',
  styleUrl: './selectbox.component.css',
})
export class SelectboxComponent {
  isDescending: boolean = false;
  dropdownOpen: boolean = false;
  @Input() selectOptions: { key: string; displayName: string }[] = [];
  @Input() options: { key: any; displayName: string }[] = [];
  @Input() selectedValue: any;
  // @Output() selectedValueChange = new EventEmitter();
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(value: boolean) {
    this.isDescending = value;
    this.dropdownOpen = false;
  }

  // onChange(event: Event) {
  //   const value = (event.target as HTMLSelectElement).value;
  //   this.selectedValue = value;
  //   this.selectedValueChange.emit(value);
  // }
}

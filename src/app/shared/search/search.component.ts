import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  @Input() searchTitle!: string;
  @Output() onInput: EventEmitter<{ searchValue: string }> = new EventEmitter<{ searchValue: string }>();

  ngOnInit(): void {
    this.searchTitle = '';
  }
}

import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit, OnChanges, DoCheck {

  @Input() message!: string;
  @Input() errorExit!: boolean;
  @Output() onConfirm = new EventEmitter<Boolean>(true);

  ngOnInit() {
    console.log(this.errorExit);
    this.errorExit = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.errorExit);
  }

  ngDoCheck(): void {
    console.log(this.errorExit);
  }


}

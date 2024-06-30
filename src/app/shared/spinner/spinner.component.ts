import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
  // animations: [
  //   trigger('keyframes', [
  //     transition(':enter', [
  //       animate('2s',
  //         keyframes([
  //           style({ transform: 'rotate(0deg)' }),
  //           style({ transform: 'rotate(360deg)' }),
  //         ])),
  //     ])
  //   ])
  // ]
})
export class SpinnerComponent implements OnInit {


  ngOnInit(): void {

  }

}

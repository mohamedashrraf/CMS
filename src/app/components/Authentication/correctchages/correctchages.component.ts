import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-correctchages',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './correctchages.component.html',
  styleUrl: './correctchages.component.css',
  animations: [
    trigger('flipInOut', [
      transition(':enter', [
        animate('1s', style({ transform: 'rotateY(90deg)' })),
      ]),
      transition(':leave', [
        animate('1s', style({ transform: 'rotateY(180deg)' })),
      ]),
    ]),
  ],
})
export class CorrectchagesComponent {

}

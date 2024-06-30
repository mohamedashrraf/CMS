import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToggleDeleteModalService } from '../../../app/services/toggleModal/toggle-delete-modal.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-card-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.css'
})
export class CardModalComponent {

  deleteAccountModal!: Boolean;

  @Input('title') title!: string;
  @Input('description') description!: string;
  @Input('cancel') cancel!: string;
  @Input('action') action!: string;
  @Input('actionBackground') actionBackground!: string;
  @Input('icon_path') icon_path!: string;
  @Input('backgroundImg') backgroundImg!: string;

  @Output() actionBtn = new EventEmitter<Event>();
  @Output() cancelBtn = new EventEmitter<Event>();
  @ViewChild('icon') icon!: ElementRef;
  constructor(private _ToggleDeleteModalService: ToggleDeleteModalService) {
    this.deleteAccountModal = false
  }

  ngOnInit(): void {
    this._ToggleDeleteModalService.getToggleValue().subscribe({
      next: (toggler) => {
        this.deleteAccountModal = toggler;
      }
    })
  }


  ngOnChange() {
    this.icon.nativeElement.style.backgroundImage = `${environment.BASEURL}assets/${this.backgroundImg}`;
    console.log(`${environment.BASEURL}assets/${this.backgroundImg}`
    );
  }

  ngAfterViewInit(): void {
    this.icon.nativeElement.style.backgroundImage = `${environment.BASEURL}assets/${this.backgroundImg}`;
    console.log(`${environment.BASEURL}assets/${this.backgroundImg}`);

  }

  closeModal() {
    this._ToggleDeleteModalService.toggle();
  }



}

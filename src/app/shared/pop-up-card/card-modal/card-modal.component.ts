import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { ToggleDeleteModalService } from '../../../services/toggleModal/toggle-delete-modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.css'
})
export class CardModalComponent implements OnInit, OnChanges {

  deleteAccountModal!: Boolean;

  @Input('title') title!: string;
  @Input('description') description!: string;
  @Input('cancel') cancel!: string;
  @Input('action') action!: string;
  @Input('actionBackground') actionBackground!: string;
  @Input('icon_path') icon_path!: string;
  @Input('backgroundImg') backgroundImg: string = 'assets/images/delete-eclipse.png';

  @Output() actionBtn = new EventEmitter<Event>();
  @Output() cancelBtn = new EventEmitter<Event>();

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

  ngOnChanges(): void {

  }

  closeModal() {
    this._ToggleDeleteModalService.toggle();
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToggleDeleteModalService } from '../../services/toggleModal/toggle-delete-modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectboxComponent } from '../selectbox/selectbox.component';


@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SelectboxComponent,
  ],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.css',
})
export class SortComponent {
  toggleSortList: Boolean = false;
  activeSort: Boolean = false;
  // sortList: string[] = ['title', 'Status', 'Meta Description', 'Created by', 'Created at'];
  dropdownOpen1: boolean = false;
  dropdownOpen2: boolean = false;
  selectedSortColumn: string = '';
  isDescending: boolean = false;
  @Input() sortOptions: { key: string; displayName: string }[] = [];
  @Output() sortCriteria = new EventEmitter<{
    sortColumn: string;
    isDescending: boolean;
  }>();

  constructor(private _ToggleSortService: ToggleDeleteModalService) {}

  toggleDropdown(option: string) {
    if (option === 'sortColumn') {
      this.dropdownOpen1 = !this.dropdownOpen1;
      this.dropdownOpen2 = false;
      if (this.dropdownOpen1) {
        if (this.sortOptions.length > 0) {
          this.selectedSortColumn = this.sortOptions[0].key;
        }
      }
    } else if (option === 'sortOrder') {
      this.dropdownOpen2 = !this.dropdownOpen2;
      this.dropdownOpen1 = false;
    }
  }

  selectOption(option: string, value: any) {
    if (option === 'sortColumn') {
      this.selectedSortColumn = value;
      this.dropdownOpen1 = false;
    } else if (option === 'sortOrder') {
      this.isDescending = value;
      this.dropdownOpen2 = false;
    }
  }
  getSelectedColumnName(): string {
    if (this.selectedSortColumn) {
      const selectedOption = this.sortOptions.find(
        (option) => option.key === this.selectedSortColumn
      );
      return selectedOption ? selectedOption.displayName : '';
    } else {
      return this.sortOptions.length > 0 ? this.sortOptions[0].displayName : '';
    }
  }

  addActiveSort() {
    this.activeSort = !this.activeSort;
    this.toggleSortList = !this.toggleSortList;
  }

  applySort() {
    this.activeSort = !this.activeSort;
    this.toggleSortList = !this.toggleSortList;
    // this.SortColumn.emit(SortColumn)
    // this.isDescending.emit(isDescending)
    // const isDescending = this.selectedSortOrder === 'From Z - A';
    this.sortCriteria.emit({
      sortColumn: this.selectedSortColumn,
      isDescending: this.isDescending,
    });
  }

  cancelSort() {
    this.activeSort = !this.activeSort;
    this.toggleSortList = !this.toggleSortList;
  }

  closeMenu() {
    this.toggleSortList = false;
    this.dropdownOpen1 = false;
    this.dropdownOpen2 = false;
          console.log('clicked outside');

  }
}

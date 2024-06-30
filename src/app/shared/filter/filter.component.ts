import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ToggleFilterDirective } from '../directives/toggle-filter.directive';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterHeader } from './filter-header.interface';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    ToggleFilterDirective,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  @ViewChild('filterEl', { static: false }) filterEl!: ElementRef;

  @Input('filters') filters!: FilterHeader[];
  @Input('cols') cols!: string[];
  @Input() searchTitle!: string;
  @Output() onInput: EventEmitter<{ searchValue: string }> = new EventEmitter<{
    searchValue: string;
  }>();
  @Output() filterCriteria = new EventEmitter<{
    filterColumn: string;
    filterValue: string;
    startDate: string;
    endDate: string;
  }>();
  // @Output() onDateChange = new EventEmitter<{ startDate: string, endDate: string }>();

  filterForm!: FormGroup;
  filteredArray!: FormArray;
  toggleFilterList: Boolean = false;
  activeFilter: Boolean = false;
  activeAddFilter: Boolean = false;
  tempCols!: string[];
  toggleFilterDropdown: boolean = false;
  togglefilterCategory: boolean = false;
  status: string='';
  filterColumn: string = '';
  filterValue: string = '';
  startDate: string = '';
  endDate: string = '';
  pageNumber!: number ;
  pageSize!:number ;
  filterDisplayName: string = '';


  dropdownOpen1: boolean = false;
  selectedFilterOption: string = '';

  constructor(private _FormBuilder: FormBuilder) {
    this.tempCols = this.cols;
  }

  ngOnInit(): void {}

  addActiveFilter() {
    if (
      this.toggleFilterList === true &&
      this.toggleFilterDropdown === false &&
      this.togglefilterCategory === false
    ) {
      this.activeFilter = true;
    }
    if (
      this.toggleFilterList === false &&
      this.toggleFilterDropdown === false &&
      this.togglefilterCategory === true
    ) {
      this.activeFilter = false;
    }
    this.activeFilter = !this.activeFilter;
    this.activeFilter
      ? this.filterEl.nativeElement.classList.add('activeFilter')
      : this.filterEl.nativeElement.classList.remove('activeFilter');
    this.activeAddFilter=false;
    this.toggleFilterList = !this.toggleFilterList;
    this.togglefilterCategory = false;
    this.toggleFilterDropdown = false;
  }
  toggleAddDropdown() {
    this.toggleFilterDropdown = !this.toggleFilterDropdown;
    this.activeAddFilter =!this.activeAddFilter;
  }

  get controls() {
    return (<FormArray>this.filterForm.get('filteredArray')).controls;
  }
  selectFilter(filter: any) {
    this.togglefilterCategory = !this.togglefilterCategory;
    this.toggleFilterList = !this.toggleFilterList;
    this.filterColumn = filter.key;
    this.filterDisplayName = filter.displayName;
    this.togglefilterCategory = true;
    this.toggleFilterDropdown = false;
  }

  getFilterColumn(e: any) {
    this.filterColumn = e.target.value;
  }

  getSelectedColumnName(): string {
    this.selectedFilterOption = this.filterColumn;
    return this.filterDisplayName;
  }
  toggleDropdown() {
    this.dropdownOpen1 = !this.dropdownOpen1;
    if (this.dropdownOpen1) {
      this.selectedFilterOption = this.filterColumn;
    }
  }
  selectOption(key: string, displayName: string) {
    this.selectedFilterOption = key;
    this.filterColumn = key;
    this.filterDisplayName = displayName;

    this.dropdownOpen1 = false;
    console.log(
      this.selectedFilterOption,
      this.filterColumn,
      this.filterDisplayName
    );
  }

  applyFilter() {
    this.toggleFilterList = false;
    this.togglefilterCategory = false;
    this.toggleFilterDropdown = false;
    this.activeFilter = false;
    this.filterEl.nativeElement.classList.remove('activeFilter');
    this.filterCriteria.emit({
      filterColumn: this.filterColumn,
      filterValue: this.filterValue,
      startDate: this.startDate,
      endDate: this.endDate,
    });
    // this.onDateChange.emit({ startDate: this.startDate, endDate: this.endDate });
    this.filterValue = '';
    this.startDate = '';
    this.endDate = '';
  }
}

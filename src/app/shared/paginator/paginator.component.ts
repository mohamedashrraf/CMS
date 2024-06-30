import { AsyncPipe, CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { OutsideClickDirective } from '../directives/outside-click.directive';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
})
export class PaginatorComponent implements AfterViewChecked, OnInit {
  /** Inputs */
  @Input('all') all: number = 5;

  /** Outputs */
  @Output('rowsCount') rowsCount = new EventEmitter<number>();
  @Output('getHistoryPaginator') getHistoryPaginator = new EventEmitter<{ currentPage: number, currentRows: number }>();

  /** Viewchild */
  @ViewChild('container') container!: ElementRef;

  /** Vars */
  content!: any[];
  pages!: number;
  active = 0;
  numberOfRecords: number = 5;
  holder!: ElementRef;
  toggleSelectMenu!: Boolean;
  openedSelect!: Boolean;
  numberOfSelectedRows: number = 5;
  currentPage: number = 1;
  currentRows: number = 5;
  firstRequestFlag: Boolean = false;

  constructor() {
    this.toggleSelectMenu = false;
  }

  ngOnChanges(): void {
    if (this.all < 8) {
      this.pages = Math.ceil(1);
    } else {
      this.pages = Math.ceil(this.all / 5);
    }
    this.changeNumberOfRecords();
  }

  ngOnInit(): void {
    if (this.all < 8) {
      this.pages = Math.ceil(1);
    } else {
      this.pages = Math.ceil(this.all / 5);
    }
    this.changeNumberOfRecords();
  }

  changeNumberOfRecords() {
    if (this.all < 8 && this.firstRequestFlag)
      this.numberOfRecords = this.all;
    else
      this.numberOfRecords = 5;
    this.firstRequestFlag = true;
    console.log("From all: " + this.numberOfRecords);
  }

  ngAfterViewChecked(): void {
    let holder = this.container.
      nativeElement.children;
    switch (true) {
      // more than 4 pages 
      case this.active === 0 && this.pages > 4:
        holder[0].className = 'active';
        holder[1].className = 'semi';
        holder[2].className = '';
        break;
      case this.active === 1 && this.pages > 4:
        holder[0].className = '';
        holder[1].className = 'active';
        holder[2].className = 'semi';
        break;
      case this.active > 1 && this.active < this.pages - 2 && this.pages > 4:
        holder[2].textContent = this.active;
        holder[3].textContent = this.active + 1;
        holder[4].textContent = this.active + 2;
        break;
      case this.active === this.pages - 2 && this.pages > 4:
        holder[3].className = 'active';
        holder[2].className = 'semi';
        holder[4].className = '';
        break;
      case this.active === this.pages - 1 && this.pages > 4:
        holder[2].className = '';
        holder[4].className = 'active';
        holder[3].className = 'semi';
        break;
      // less than 5 pages
      case this.pages <= 4:
        Array.from(holder).forEach((e, i) => {
          i === this.active ? (e as HTMLElement).className = "active" : i === this.active + 1 && this.active < this.pages - 1 ? (e as HTMLElement).className = "semi" : (e as HTMLElement).className = "";
        });
        break;
    }
  }

  // Toggle select menu
  toggleMenu() {
    this.toggleSelectMenu = !this.toggleSelectMenu;
  }

  selectPaginationNumber(event: any) {
    console.log(event);

    // Condition for forbbidening the request to go to unexisting page for the backend, so reinitializing the currentPage to 1. 
    if (this.currentPage == Math.ceil(this.all / this.currentRows)) {
      this.currentPage = 1;
      this.active = 0;
    }

    this.numberOfRecords = event.target.innerText;
    this.currentRows = Number(event.target.innerText);
    this.pages = Math.ceil(this.all / this.currentRows)
    this.getHistoryPaginator.emit({ currentPage: this.currentPage, currentRows: this.currentRows });
  }

  // get number of needed display user 
  onChange(e: any) {
    this.active = 0;
    this.pages = Math.ceil(this.all / e);
  }

  // next page 
  nextPage() {

    if (this.active >= this.pages - 1) {
      return;
    }

    this.active = this.active < this.pages - 1 ? ++this.active : this.active;
    if (this.currentPage < Math.ceil(this.all / this.currentRows)) {
      this.currentPage++;
    }
    this.getHistoryPaginator.emit({ currentPage: this.currentPage, currentRows: this.currentRows });
  }

  // previous page
  prevPage() {
    if (this.active === 0) {
      return;
    }
    this.active = this.active > 0 ? --this.active : this.active;
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.getHistoryPaginator.emit({ currentPage: this.currentPage, currentRows: this.currentRows });
  }

  // go to first slide 
  firstSlide() {

    if (this.active === 0) {
      return;
    }
    this.active = 0;
    this.currentPage = 1;
    this.getHistoryPaginator.emit({ currentPage: this.currentPage, currentRows: this.currentRows });
  }

  // go to last slide 
  lastSlide() {

    if (this.active >= this.pages - 1) {
      return;
    }

    this.active = this.pages - 1;
    this.currentPage = Math.ceil(this.all / this.currentRows);
    this.getHistoryPaginator.emit({ currentPage: this.currentPage, currentRows: this.currentRows });
  }

  toggleSelect() {
    this.openedSelect = !this.openedSelect;
  }
}

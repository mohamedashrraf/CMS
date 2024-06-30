import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { TableData } from '../table/table-data';
import { DatePipe, LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-test-table',
  standalone: true,
  imports: [],
  templateUrl: './test-table.component.html',
  styleUrl: './test-table.component.css'
})
export class TestTableComponent {

  @Input() tableData: TableData[] = [];
  @Input() data: any;
  @Output() blogState: EventEmitter<{ type: String, rowId: string }> = new EventEmitter<{ type: String, rowId: string }>();
  @Output() roleState: EventEmitter<{ type: String, rowId: string }> = new EventEmitter<{ type: String, rowId: string }>();
  @Output() deleteUser: EventEmitter<{ rowId: string }> = new EventEmitter<{ rowId: string }>();
  @Output() deletePost: EventEmitter<{ rowId: string }> = new EventEmitter<{ rowId: string }>();
  @Output() deleteRole: EventEmitter<{ rowId: string }> = new EventEmitter<{ rowId: string }>();
  @Output() userActivation: EventEmitter<{ state: string, rowId: string, type: number }> = new EventEmitter<{ state: string, rowId: string, type: number }>();
  @Output() inviteUser: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelInvitation: EventEmitter<{ rowId: string }> = new EventEmitter<{ rowId: string }>();
  @Output() User: EventEmitter<any> = new EventEmitter<any>();
  @ViewChildren('menu') menus!: QueryList<any>;

  rows: number = 2;
  userBlogToggle!: Boolean;
  roleToggle!: Boolean;
  toggleActionMenuFlag: Boolean = false;
  toggleActionMenu: boolean[] = [];
  currentRowId!: undefined | string;
  blogEditMenu!: Boolean;
  firstRequestFlag: Boolean = false;


  constructor(private _LocationStrategy: LocationStrategy) {
    this.tableData = [];
    this.data = [];
    this.userBlogToggle = false;
    this.blogEditMenu = false;
    this.roleToggle=false;

  }


  // ngOnChanges(): void { //make role data null
  //   if (this.data.length < 1) {
  //     this.data = [];
  //   }
  // }
  ngOnChanges(): void {
    // const includesRole = this._LocationStrategy.path().includes('roles');
    // if (includesRole && this.firstRequestFlag) {
    //   this.roleToggle = true;
    //   if (this.data.length <= 1) {
    //     this.data = [];
    //   }else {
    //     this.firstRequestFlag = true;
    //   }
    // } else {
    //   this.roleToggle = false;
    // }

    const includesRole = this._LocationStrategy.path().includes('roles');
    if (includesRole ) {
      this.roleToggle = true;
      if (this.data.length <= 1) {
        this.data = [];
      } else {
        this.firstRequestFlag = true;
      }
    } else {
      this.roleToggle = false;
    }
  }
  ngOnInit(): void {
    this.data.forEach((dataItem: any) => {
      dataItem.showMenu = false;
      dataItem.showEditMenu = false;
      dataItem.showBlogEditMenu = false;
      dataItem.showRoleEditMenu = false;
    });

    const includesBlog = this._LocationStrategy.path().includes('blog');
    if (includesBlog) {
      this.userBlogToggle = true;
    } else {
      this.userBlogToggle = false;
    }

  }

  getCount(e: number) {
    this.rows = e;
  }

  ActionMenu(row: any) {
    if (row.showEditMenu) {
      row.showEditMenu = false;
      this.currentRowId = undefined;
    }
    if (this.currentRowId == row.id) {
      row.showMenu = false;
      this.currentRowId = undefined;
      return;
    }
    this.currentRowId = row.id;
    this.data.forEach((dataItem: any) => {
      dataItem.showMenu = false;
    });
    row.showMenu = !row.showMenu;
  }


  ActionEditMenu(row: any) {
    if (row.showMenu) {
      row.showMenu = false;
      this.currentRowId = undefined;
    }
    if (this.currentRowId == row.id) {
      row.showEditMenu = false;
      this.currentRowId = undefined;
      return;
    }
    this.currentRowId = row.id;
    this.data.forEach((dataItem: any) => {
      dataItem.showEditMenu = false;
    });
    row.showEditMenu = !row.showEditMenu;

  }

  blogActionMenu(row: any) {
    // if (row.showBlogEditMenu) {
    //   row.showBlogEditMenu = false;
    //   this.currentRowId = undefined;
    // }
    // if (this.currentRowId == row.id) {
    //   row.showBlogEditMenu = false;
    //   this.currentRowId = undefined;
    //   return;
    // }

    // this.currentRowId = row.id;
    // this.data.forEach((dataItem: any) => {
    //   dataItem.showBlogEditMenu = false;
    // });
    if (row.showMenu) {
      row.showMenu = false;
      this.currentRowId = undefined;
    }
    if (this.currentRowId == row.id) {
      row.showEditMenu = false;
      this.currentRowId = undefined;
      return;
    }
    this.currentRowId = row.id;
    this.data.forEach((dataItem: any) => {
      dataItem.showEditMenu = false;
    });
    row.showBlogEditMenu = !row.showBlogEditMenu;
  }

  roleActionMenu(row:any){
    if (row.showMenu) {
      row.showMenu = false;
      this.currentRowId = undefined;
    }
    if (this.currentRowId == row.id) {
      row.showEditMenu = false;
      this.currentRowId = undefined;
      return;
    }
    this.currentRowId = row.id;
    this.data.forEach((dataItem: any) => {
      dataItem.showEditMenu = false;
    });
    row.showRoleEditMenu = !row.showRoleEditMenu;
  }

  convertUTCtoLocal(columnKey: string, date: string): any {
    const column = this.tableData.find(col => col.key === columnKey);
    if (column && column.pipe instanceof DatePipe) {
      const utcDate = new Date(date);
      return column.pipe.transform(utcDate, ' h:mm a - dd MMM ,yyyy');
    }
    return date; // Return date string as is if pipe is not defined or not an instance of DatePipe
  }


  onEdit(id: { type: String, rowId: string }) {
    this.blogState.emit(id);
  }

}
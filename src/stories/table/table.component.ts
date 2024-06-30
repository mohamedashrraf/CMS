import { Component, Input, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';


import { PaginatorComponent } from '../paginator/paginator.component';
import { ManageUser } from '../../app/interfaces/manage-user';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [PaginatorComponent, AsyncPipe, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {

  @Input('headRow') headRow: string[] = [];
  @Input('bodyRow') bodyRow: ManageUser[] = [];
  @Input('rows') rows!: number;

  constructor() { }

  ngOnInit(): void {
    if (!this.bodyRow.length) {
      this.bodyRow.push({
        id: '1',
        fullName: "string",
        profileImagePath: '',
        userStatus: true,
        email: 'string',
        createdAt: '11:43 am - 18 Jun , 2024',
        roleName: 'string',
      }, {
        id: '1',
        fullName: "string",
        profileImagePath: '',
        userStatus: true,
        email: 'string',
        createdAt: '11:43 am - 18 Jun , 2024',
        roleName: 'string',
      }, {
        id: '1',
        fullName: "string",
        profileImagePath: '',
        userStatus: false,
        email: 'string',
        createdAt: '11:43 am - 18 Jun , 2024',
        roleName: 'string',
      }, {
        id: '1',
        fullName: "string",
        profileImagePath: '',
        userStatus: false,
        email: 'string',
        createdAt: '11:43 am - 18 Jun , 2024',
        roleName: 'string',
      }, {
        id: '1',
        fullName: "string",
        profileImagePath: '',
        userStatus: false,
        email: 'string',
        createdAt: '11:43 am - 18 Jun , 2024',
        roleName: 'string',
      });
    }

    this.headRow.push('id', 'name', 'Status', 'Role', 'Email', 'Created At', '');
    console.log(this.bodyRow.length);
    console.log("rows: " + this.rows);
    this.rows = 5
  }

  getCount(e: number) {
    this.rows = e;
    console.log("rows: " + this.rows);

  }

  // activated selected class
  onChecked(e: Event) {
    (((e.target as HTMLElement).parentElement as HTMLElement).parentElement as HTMLElement).classList.toggle('selected');
  }
}

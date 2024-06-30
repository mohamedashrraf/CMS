import { ApiBlogService } from './services/api-blog.service';
import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../../services/breadcrumb/breadcrumb.service';
import { CommonModule, DatePipe } from '@angular/common';
import {
  ActivatedRoute,
  NavigationExtras,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { FilterComponent } from '../../../shared/filter/filter.component';
import { AddButtonComponent } from '../../../shared/add-button/button.component';
import { FormsModule } from '@angular/forms';
import { Post } from './Interfaces/post';
import { PaginatorComponent } from '../../../shared/paginator/paginator.component';
import { TableData } from '../../../shared/table/table-data';
import { TableComponent } from '../../../shared/table/table.component';
import { GlobalResponse } from './Interfaces/generic';
import { ToastService } from '../../../services/toast/toast.service';
import { ToastType } from '../../../interfaces/toast';
import { SortComponent } from '../../../shared/sort/sort.component';
import { SearchComponent } from '../../../shared/search/search.component';
import { FilterHeader } from '../../../shared/filter/filter-header.interface';
import { ToggleDeleteModalService } from '../../../services/toggleModal/toggle-delete-modal.service';
import { CardModalComponent } from '../../../shared/pop-up-card/card-modal/card-modal.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    AddButtonComponent,
    SearchComponent,
    FilterComponent,
    SortComponent,
    PaginatorComponent,
    TableComponent,
    CardModalComponent,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent {
  toggleEditMenu: boolean = false;
  posts: Post[] = [];
  searchedPosts: Post[] = [];
  @Input() searchTitle: string = '';
  postStatus!: string;
  activeStatus!: string;
  // searchValue: string = '';
  activeFilter: boolean = false;
  activeSort: boolean = false;
  sortColumn: string = '';
  isDescending!: boolean;
  unpublishBlogFlag!: Boolean;
  deletePostFlag: Boolean = false;

  rows = 2; // For paginator
  tableData: TableData[] = [
    { key: 'id', displayName: 'Blog ID' },
    { key: 'title', displayName: 'Blog Title' },
    { key: 'status', displayName: 'Status' },
    { key: 'metaDescription', displayName: 'Meta Description' },
    { key: 'createdBy', displayName: 'Created by' },
    {
      key: 'creationDate',
      displayName: 'Created at',
      pipe: new DatePipe('en-us'),
    },
  ];

  sortData: TableData[] = [
    { key: 'title', displayName: 'Blog Title' },
    { key: 'status', displayName: 'Status' },
    { key: 'metaDescription', displayName: 'Meta Description' },
    { key: 'createdBy', displayName: 'Created by' },

    {
      key: 'creationDate',
      displayName: 'Created at',
      pipe: new DatePipe('en-us'),
    },
  ];
  filterData: FilterHeader[] = [
    { key: 'createdBy', displayName: 'Created by' },
    { key: 'creationDate', displayName: 'One Day' },
    { key: 'creationDate', displayName: 'Date Range' },
  ];

  constructor(
    private _BreadCurmb: BreadcrumbService,
    private apiBlogService: ApiBlogService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private _ToggleModal: ToggleDeleteModalService
  ) {
    this.postStatus = '0';
  }

  ngOnInit(): void {
    //   this._BreadCurmb.changeCurrentPath();
    //   this.route.queryParams.subscribe(params => {
    //     this.searchTitle = params['search'] || '';
    //     this.searchPosts();
    // });
    this._ToggleModal.setDeletingToggle(false);

    this.route.queryParamMap.subscribe({
      next: (params) => {
        this.postStatus = params.get('pstatus') || '0';
        this.setActive(this.postStatus);
        this.getPosts(this.postStatus);
      },
    });
  }

  getPosts(state: string): void {
    this.apiBlogService
      .getAllPosts(state)
      .subscribe((res: GlobalResponse<Post[]>) => {
        if (res.data) {
          this.posts = res.data;
          this.searchedPosts = res.data;
          // this.searchPosts();
        } else {
          this.posts = [];
          this.searchedPosts = [];
        }
      });
  }

  //Browse status
  navigateWithQueryParam(paramKey: string, paramValue: string): void {
    const queryParams = { [paramKey]: paramValue };
    const navigationExtras: NavigationExtras = {
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    };
    this.router.navigate([], navigationExtras);
  }
  //show active class style when Browse status
  setActive(status: string) {
    this.activeStatus = status;
  }
  isActive(status: string): boolean {
    return this.activeStatus === status;
  }

  // onEdit() {
  //   this.toggleUserMenu = !this.toggleUserMenu;
  // }

  //search
  // onSearchChange(): void {
  //   this.router.navigate([], {
  //     queryParams: { search: this.searchTitle },
  //     queryParamsHandling: 'merge'
  //   });
  // }
  // searchPosts(): void {
  //   if (this.searchTitle) {
  //     this.searchedPosts = this.posts.filter(post =>
  //       post.title.toLowerCase().includes(this.searchTitle.toLowerCase())
  //     );
  //   } else {
  //     this.searchedPosts = this.posts;
  //   }
  // }

  searchPosts(search: { searchValue: string }) {
    this.apiBlogService
      .getPostsBySearch('title', search.searchValue)
      .subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchedPosts = res.data;
            console.log(this.searchedPosts);
          } else {
            this.searchedPosts = [];
          }
        },
        error: (err) => {
          this.toastService.addToast({
            message: `${err.message}`,
            type: ToastType.Failed,
            title: 'Error',
          });
        },
      });
  }

  filterPosts(filter: {
    filterColumn: string;
    filterValue: string;
    startDate: string;
    endDate: string;
  }) {
    const { filterColumn, filterValue, startDate, endDate } = filter;
    console.log(filter);

    this.apiBlogService
      .getPostsByFilter(filterColumn, filterValue, startDate, endDate)
      .subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchedPosts = res.data;
            console.log(this.searchedPosts);
          } else {
            this.searchedPosts = [];
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  // filterPosts(search: { searchValue: string }){
  //   this.searchValue = search.searchValue;
  //   if (this.searchValue) {
  //     this.searchedPosts = this.posts.filter(post =>
  //       post.fullName.toLowerCase().includes(this.searchValue.toLowerCase())
  //     );
  //   } else {
  //     this.searchedPosts = this.posts;
  //   }
  // }

  sortPosts(sortCriteria: { sortColumn: string; isDescending: boolean }) {
    const { sortColumn, isDescending } = sortCriteria;
    this.apiBlogService.getPostsBySort(sortColumn, isDescending).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.searchedPosts = res.data;
          console.log(this.searchedPosts);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }


  // filterWithDate(event:{ startDate: string, endDate: string }){
  //   this.apiBlogService.getPostsByFilter(event.startDate, event.endDate,'creationDate').subscribe({
  //     next: (res: any) => {
  //       if (res.data) {
  //         this.searchedPosts = res.data;
  //         console.log(this.searchedPosts);
  //       }
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     }
  //   })
  // }

  /******************** Unpublish POST ********************/
  // temp variable for caching post data
  currentPostState!: any;
  postStateToggle(e: any) {
    this.currentPostState = e;
    this.unpublishBlogFlag = true;
    this._ToggleModal.toggle();
  }

  changePostState() {
    if (this.currentPostState.type == '1') {
      this.apiBlogService.publishPost(this.currentPostState.rowId).subscribe({
        next: (res) => {
          console.log(res);
          this.toastService.addToast({
            message: `State Changed Successfully.`,
            type: ToastType.Success,
            title: 'Success',
            duration: 4000,
          });
          this.cancelChangePostState();
        },
      });
    } else {
      this.apiBlogService.unpublishPost(this.currentPostState.rowId).subscribe({
        next: (res) => {
          console.log(res);
          this.toastService.addToast({
            message: `State Changed Successfully.`,
            type: ToastType.Success,
            title: 'Success',
            duration: 4000,
          });
          this.cancelChangePostState();
        },
      });
    }
  }

  cancelChangePostState() {
    this.currentPostState = {};
    this.unpublishBlogFlag = false;
    this._ToggleModal.toggle();
  }

  /******************** DELETING POST ********************/
  // temp variable for caching user data
  currentDeletedPostData!: any;
  deletePostToggle(e: any) {
    this.currentDeletedPostData = e;
    this.deletePostFlag = true;
    this._ToggleModal.toggle();
    console.log(this.deletePostFlag);
  }

  deletePost() {
    this.apiBlogService
      .deletePost(this.currentDeletedPostData.rowId)
      .subscribe({
        next: (res) => {
          this.toastService.addToast({
            message: `${res.message}`,
            type: ToastType.Success,
            title: 'Success',
            duration: 4000,
          });
          this.getPosts(this.postStatus);
          this.cancelDeletingPost();
        },
      });
  }

  cancelDeletingPost() {
    this.currentDeletedPostData = {};
    this._ToggleModal.toggle();
    this.deletePostFlag = false;
  }

  // Pagination
  getCount(e: number) {
    this.rows = e;
    console.log(this.rows, 'rows number');
  }

  ngOnDestroy(): void {}
}

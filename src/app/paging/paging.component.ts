import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {
  @Input() page:number;
  @Output() newPage = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  nextPage(e: Event):void {
    e.preventDefault();
    this.newPage.emit(this.page + 1);
  }
  
  prePage(e: Event): void {
    e.preventDefault();
    if(this.page > 1) {
      this.newPage.emit(this.page - 1);
    }
  }
}

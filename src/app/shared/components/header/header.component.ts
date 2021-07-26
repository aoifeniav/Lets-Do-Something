import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IHeader } from '../../models/ishared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() public headerContent!: IHeader;

  @Output() public tagClickEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onTagClick(event: any) {
    event.target.classList.toggle('header-block__tag--active');
    event.target.classList.toggle('header-block__tag--inactive');
    event.target.children.item(0).classList.toggle('fa-check-square');
    event.target.children.item(0).classList.toggle('fa-square');
    // this.tagClickEvent.emit(event);
  }
}

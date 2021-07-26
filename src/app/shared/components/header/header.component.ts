import { Component, Input, OnInit } from '@angular/core';
import { IHeader } from '../../models/ishared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() public headerContent!: IHeader;

  constructor() { }

  ngOnInit(): void {
  }

}

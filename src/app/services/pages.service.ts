import { Injectable } from '@angular/core';
import { ICard } from 'src/app/shared/models/ishared';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  public clasified: ICard[] = [];

  constructor() {
  }
}
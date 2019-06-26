import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnChanges {
  @Input() rating: number ;  
  starWidth: number;
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.rating = 0
    this.starWidth = 0
  }

  ngOnChanges(): number {
    return this.starWidth = this.rating * 75 / 5
  } 
  
  onClick(): void {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked!`)
  }
}
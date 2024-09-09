import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate('1s')
      ]),
    ])
  ]
})
export class Myanimation {
  animationState = 'active';

  toggleAnimation() {
    this.animationState = this.animationState === 'active' ? 'inactive' : 'active';
  }
}


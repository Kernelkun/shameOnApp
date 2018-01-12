import { Component, OnInit } from '@angular/core';
import anime from 'animejs';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit {

  animation: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.animation = anime.timeline()
      .add({
        targets: '.home-animation .word',
        scale: [14, 1],
        opacity: [0, 1],
        easing: 'easeOutCirc',
        duration: 800,
        delay: function (el, i) {
          return 800 * i;
        }
      }).add({
        targets: '.home-animation',
        opacity: .0,
        easing: 'easeInOutQuad',
        complete: function () {
          document.querySelector('.home-animation').remove();
        }
      });
  }
}

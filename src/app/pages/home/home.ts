import { Component } from '@angular/core';
import { AuroraBackground } from '../../components/aurora-background/aurora-background';
import { Intro } from '../../components/intro/intro';
import { Main } from '../../components/main/main';

@Component({
  selector: 'app-home',
  imports: [AuroraBackground, Intro, Main],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  showIntro = true;

  onIntroComplete() {
    this.showIntro = false;
  }
}

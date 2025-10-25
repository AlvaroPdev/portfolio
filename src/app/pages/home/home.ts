import { Component } from '@angular/core';
import { AuroraBackground } from '../../components/aurora-background/aurora-background';
import { Intro } from '../../components/intro/intro';

@Component({
  selector: 'app-home',
  imports: [AuroraBackground, Intro],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home { }

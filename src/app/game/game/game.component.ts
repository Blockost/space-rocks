import { Component, OnInit } from '@angular/core';

import * as Phaser from 'phaser';
import { HelloWorldSceneComponent } from 'src/app/scenes/hello-world-scene/hello-world-scene.component';

@Component({
  selector: 'app-game',
  template: ''
})
export class GameComponent implements OnInit {
  private readonly game: Phaser.Game;

  constructor() {
    const gameConfig: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      },
      scene: HelloWorldSceneComponent
    };

    this.game = new Phaser.Game(gameConfig);
  }

  ngOnInit() {}
}

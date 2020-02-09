import { Component } from '@angular/core';
import StartScene from './scenes/start.scene';
import MainScene from './scenes/main.scene';
import WinScene from './scenes/win.scene';
import GameoverScene from './scenes/gameover.scene';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private game: Phaser.Game;

  constructor() {
    const gameConfig: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      // No gravity in Space Rocks (its in space but only asteroids exist)
      // TODO: 2020-02-06 Blockost Implementing a gravitational pull from asteroids can be interesting?
      physics: {
        default: 'matter',
        arcade: {
          gravity: { y: 0 },
          debug: true
        },
        matter: {
          'plugins.wrap': true,
          gravity: false,
          debug: false
        }
      },
      // Main scene is added/removed programmatically in order to reset it
      scene: [StartScene, WinScene, GameoverScene]
    };

    this.game = new Phaser.Game(gameConfig);
  }
}

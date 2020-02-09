import { Component } from '@angular/core';
import { MainSceneComponent } from './scenes/main.scene';
import UIScene from './scenes/ui.scene';

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
      scene: [MainSceneComponent, UIScene]
    };

    this.game = new Phaser.Game(gameConfig);
    // Starts UI scene
    this.game.scene.start('UI');
  }
}

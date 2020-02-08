import { Component } from '@angular/core';
import BaseScene from '../base-scene.component';
import Player from 'src/app/objects/player/player';
import Asteroid, { AsteroidType } from 'src/app/objects/asteroid/asteroid';
import EnumHelper from 'src/app/utils/enumHelper';

@Component({
  selector: 'app-main-scene',
  template: ''
})
export class MainSceneComponent extends BaseScene {
  static readonly KEY = 'MAIN';
  private player: Player;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super(MainSceneComponent.KEY);
  }

  preload() {
    super.preload();

    this.load.image('ship', '/assets/sprites/spr_ship.png');
    this.load.image('asteroid_small', '/assets/sprites/spr_asteroid_small.png');
    this.load.image('asteroid_med', '/assets/sprites/spr_asteroid_med.png');
    this.load.image('asteroid_huge', '/assets/sprites/spr_asteroid_huge.png');
    this.load.image('bullet', '/assets/sprites/spr_bullet.png');
    this.load.image('debris', '/assets/sprites/spr_debris.png');
  }

  create() {
    super.create();

    // Enable input keys
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    // create asteroids
    for (let i = 0; i < 8; i++) {
      const asteroidType = EnumHelper.getRandomFromEnum(AsteroidType);
      new Asteroid(this, Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600), asteroidType);
    }

    // Create player
    this.player = new Player(this, 600, 100);
  }

  update(time: number, delta: number) {
    super.update(time, delta);

    this.player.update(time, delta, this.cursorKeys);
  }
}

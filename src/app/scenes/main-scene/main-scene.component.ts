import { Component } from '@angular/core';
import BaseScene from '../base-scene.component';
import Player from 'src/app/objects/player/player';
import Asteroid, { AsteroidType } from 'src/app/objects/asteroid/asteroid';

@Component({
  selector: 'app-main-scene',
  template: ''
})
export class MainSceneComponent extends BaseScene {
  player: Player;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  nonCollidingGroup: number;

  constructor() {
    super('Main');
  }

  init() {
    console.log('global plugins', this.plugins.plugins);
    console.log('scene plugins', this.plugins.scenePlugins);
    console.log(this.plugins.get('matter'));
  }

  preload() {
    super.preload();

    this.load.image('ship', '/assets/sprites/spr_ship.png');
    this.load.image('asteroid_small', '/assets/sprites/spr_asteroid_small.png');
    this.load.image('asteroid_med', '/assets/sprites/spr_asteroid_med.png');
    this.load.image('asteroid_huge', '/assets/sprites/spr_asteroid_huge.png');
    this.load.image('bullet', '/assets/sprites/spr_bullet.png');
  }

  create() {
    super.create();

    this.nonCollidingGroup = this.matter.world.nextGroup(true);
    // Enable input keys
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    // create asteroids
    for (let i = 0; i < 8; i++) {
      const asteroidType = this.getRandomFromEnum(AsteroidType);
      new Asteroid(this, Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600), asteroidType);
    }

    // Create player
    this.player = new Player(this, 600, 100);
  }

  update(time: number, delta: number) {
    this.player.update(time, delta, this.cursorKeys);
  }

  private getRandomFromEnum(anyEnum: any): number {
    const enumKeys = Object.keys(anyEnum)
      .map((key) => parseInt(key))
      .filter((key) => !isNaN(key));

    return enumKeys[Math.floor(Math.random() * enumKeys.length)];
  }
}

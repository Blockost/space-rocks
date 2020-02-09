import * as Phaser from 'phaser';
import OnDestroy from './behaviors/onDestroy';
import Debris from 'src/app/objects/debris';
import { GameEvent } from '../utils/gameEvent';

export enum AsteroidType {
  SMALL,
  MEDIUM,
  HUGE
}

export default class Asteroid extends Phaser.GameObjects.Image implements OnDestroy {
  private matterImage: Phaser.Physics.Matter.Image;
  private objectType: AsteroidType;

  constructor(scene: Phaser.Scene, x: number, y: number, type: AsteroidType) {
    const texture = Asteroid.getAsteroidTexture(type);
    super(scene, x, y, texture);
    this.objectType = type;

    this.matterImage = this.scene.matter.add.image(x, y, texture, null, {
      plugin: {
        wrap: {
          min: { x: 0, y: 0 },
          max: { x: 800, y: 600 }
        }
      }
    });
    this.matterImage.setData('instance', this);

    this.matterImage.setName(texture);
    this.matterImage.setBounce(1);
    this.matterImage.setFriction(0, 0);
    this.matterImage.setMass(Asteroid.getAsteroidMass(type));

    // Set random velocity
    const velocityX = Phaser.Math.FloatBetween(-0.8, 0.8);
    const velocityY = Phaser.Math.FloatBetween(-0.8, 0.8);
    this.matterImage.setVelocity(velocityX, velocityY);

    this.on('destroy', this.onDestroy.bind(this));
  }

  /**
   * On destroy, update score, create smaller asteroids and debris
   */
  onDestroy() {
    const score = Asteroid.getAsteroidScore(this.objectType);
    this.scene.events.emit(GameEvent.UPDATE_SCORE, score);

    this.createSmallerAsteroids();
    this.generateDebris();
    this.matterImage.destroy();
  }

  private createSmallerAsteroids() {
    switch (this.objectType) {
      case AsteroidType.HUGE:
        for (let i = 0; i < 2; i++) {
          new Asteroid(this.scene, this.matterImage.x, this.matterImage.y, AsteroidType.MEDIUM);
        }
        break;

      case AsteroidType.MEDIUM:
        for (let i = 0; i < 2; i++) {
          new Asteroid(this.scene, this.matterImage.x, this.matterImage.y, AsteroidType.SMALL);
        }
        break;

      default:
        // XXX: 2020-02-07 Blockost No asteroids created for AsteroidType.SMALL
        break;
    }
  }

  private generateDebris() {
    for (let i = 0; i < 10; i++) {
      new Debris(this.scene, this.matterImage.x, this.matterImage.y, Phaser.Math.FloatBetween(-180, 180));
    }
  }

  static getAsteroidTexture(type: AsteroidType): string {
    switch (type) {
      case AsteroidType.SMALL:
        return 'asteroid_small';
      case AsteroidType.MEDIUM:
        return 'asteroid_med';
      case AsteroidType.HUGE:
        return 'asteroid_huge';
      default:
        throw new Error(`Unsupported asteroid type ${type}`);
    }
  }

  static getAsteroidMass(type: AsteroidType): number {
    switch (type) {
      case AsteroidType.SMALL:
        return 1;
      case AsteroidType.MEDIUM:
        return 20;
      case AsteroidType.HUGE:
        return 100;
      default:
        throw new Error(`Unsupported asteroid type ${type}`);
    }
  }

  static getAsteroidScore(type: AsteroidType): number {
    switch (type) {
      case AsteroidType.SMALL:
        return 50;
      case AsteroidType.MEDIUM:
        return 20;
      case AsteroidType.HUGE:
        return 10;
      default:
        throw new Error(`Unsupported asteroid type ${type}`);
    }
  }
}

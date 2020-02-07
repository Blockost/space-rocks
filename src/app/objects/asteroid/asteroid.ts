import * as Phaser from 'phaser';

export enum AsteroidType {
  SMALL,
  MEDIUM,
  HUGE
}

export default class Asteroid extends Phaser.GameObjects.Image {
  private matterImage: Phaser.Physics.Matter.Image;

  constructor(scene: Phaser.Scene, x: number, y: number, type: AsteroidType) {
    const texture = Asteroid.getAsteroidTexture(type);
    super(scene, x, y, texture);

    this.matterImage = this.scene.matter.add.image(x, y, texture, null, {
      plugin: {
        wrap: {
          min: { x: 0, y: 0 },
          max: { x: 800, y: 600 }
        }
      }
    });

    this.matterImage.name = texture;
    this.matterImage.setDataEnabled();
    this.matterImage.setData('test', 'lala');
    this.matterImage.setBounce(1);
    this.matterImage.setFriction(0, 0);
    this.matterImage.setMass(Asteroid.getAsteroidMass(type));

    // Set random velocity
    const velocityX = Phaser.Math.FloatBetween(-0.8, 0.8);
    const velocityY = Phaser.Math.FloatBetween(-0.8, 0.8);
    this.matterImage.setVelocity(velocityX, velocityY);
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
}

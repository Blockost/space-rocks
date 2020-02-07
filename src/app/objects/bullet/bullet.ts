import * as Phaser from 'phaser';
import onCollide from '../onCollide';
import Asteroid, { AsteroidType } from '../asteroid/asteroid';
import Debris from '../debris/debris';

export default class Bullet extends Phaser.GameObjects.Image implements onCollide {
  private matterImage: Phaser.Physics.Matter.Image;

  constructor(scene: Phaser.Scene, x: number, y: number, angle: number) {
    super(scene, x, y, 'bullet');
    this.matterImage = this.scene.matter.add.image(x, y, 'bullet');

    this.matterImage.setScale(2).setAngle(angle);
    this.matterImage.setBounce(0);
    this.matterImage.setFriction(0, 0);
    this.matterImage.setMass(0.1);
    this.matterImage.thrust(0.01);

    this.matterImage.setOnCollide(this.onCollide.bind(this));
  }

  update(time: number, delta: number) {}

  /**
   * When bullet hits an asteroid, destroy bullet and either split asteroid into 2 smaller ones
   * or destroy it if it is small
   */
  onCollide({ bodyB: self, bodyA: other }: { bodyB: MatterJS.BodyType; bodyA: MatterJS.BodyType }): void {
    const bullet = self.gameObject as Phaser.GameObjects.GameObject;
    // TODO: 2020-02-07 Blockost Investigate "ERROR TypeError: Cannot read property 'destroy' of null"
    bullet.destroy();

    const gameObject = other.gameObject as Phaser.GameObjects.GameObject;

    if (gameObject.name.startsWith('asteroid')) {
      const asteroidHit = gameObject as Phaser.Physics.Matter.Image;
      this.createSmallerAsteroids(asteroidHit);
      this.generateDebris(asteroidHit);
      asteroidHit.destroy();
    }
  }

  private createSmallerAsteroids(asteroidHit: Phaser.Physics.Matter.Image) {
    switch (asteroidHit.name) {
      case 'asteroid_huge':
        for (let i = 0; i < 2; i++) {
          new Asteroid(this.scene, asteroidHit.x, asteroidHit.y, AsteroidType.MEDIUM);
        }
        break;

      case 'asteroid_med':
        for (let i = 0; i < 2; i++) {
          new Asteroid(this.scene, asteroidHit.x, asteroidHit.y, AsteroidType.SMALL);
        }
        break;

      default:
        // XXX: 2020-02-07 Blockost No asteroids created for AsteroidType.SMALL
        break;
    }
  }

  private generateDebris(asteroidHit: Phaser.Physics.Matter.Image) {
    for (let i = 0; i < 10; i++) {
      new Debris(this.scene, asteroidHit.x, asteroidHit.y, Phaser.Math.FloatBetween(-180, 180));
    }
  }
}

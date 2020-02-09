import * as Phaser from 'phaser';
import onCollide from './behaviors/onCollide';
import OnDestroy from './behaviors/onDestroy';
import Asteroid from './asteroid';

export default class Bullet extends Phaser.GameObjects.Image implements onCollide, OnDestroy {
  private matterImage: Phaser.Physics.Matter.Image;

  constructor(scene: Phaser.Scene, x: number, y: number, angle: number) {
    super(scene, x, y, 'bullet');
    this.matterImage = this.scene.matter.add.image(x, y, 'bullet');

    this.matterImage.setData('instance', this);
    this.matterImage.setName('bullet');
    this.matterImage.setScale(2).setAngle(angle);
    this.matterImage.setBounce(0);
    this.matterImage.setFriction(0, 0);
    this.matterImage.setMass(0.1);
    this.matterImage.thrust(0.01);

    this.matterImage.setOnCollide(this.onCollide.bind(this));
    this.on('destroy', this.onDestroy.bind(this));
  }

  /**
   * When bullet hits an asteroid, destroy bullet and asteroid
   */
  onCollide(collisionData: Phaser.Types.Physics.Matter.MatterCollisionData): void {
    // XXX: 2020-02-09 Blockost If either gameobjects are not defined, it means the collision has happened after
    // one of the bodies have been destroyed. Ignore it
    if (!collisionData.bodyA.gameObject || !collisionData.bodyB.gameObject) {
      return;
    }

    const gameObjectA = collisionData.bodyA.gameObject as Phaser.GameObjects.GameObject;
    const gameObjectB = collisionData.bodyB.gameObject as Phaser.GameObjects.GameObject;

    // Retrieve self and other
    let self: Phaser.GameObjects.GameObject;
    let other: Phaser.GameObjects.GameObject;
    if (gameObjectA.name === 'bullet') {
      self = gameObjectA;
      other = gameObjectB;
    } else {
      self = gameObjectB;
      other = gameObjectA;
    }

    const bullet = (self as Phaser.Physics.Matter.Image).getData('instance') as Bullet;
    bullet.destroy();

    if (other.name.startsWith('asteroid')) {
      const asteroidHit = (other as Phaser.Physics.Matter.Image).getData('instance') as Asteroid;
      asteroidHit.destroy();
    }

    // If bullet collided with anything else, ignore it.
  }

  onDestroy(): void {
    this.matterImage.destroy();
  }
}

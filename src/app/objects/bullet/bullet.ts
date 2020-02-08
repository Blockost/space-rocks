import * as Phaser from 'phaser';
import onCollide from '../onCollide';

export default class Bullet extends Phaser.GameObjects.Image implements onCollide {
  private matterImage: Phaser.Physics.Matter.Image;

  constructor(scene: Phaser.Scene, x: number, y: number, angle: number) {
    super(scene, x, y, 'bullet');
    this.matterImage = this.scene.matter.add.image(x, y, 'bullet');

    this.matterImage.setName('bullet');
    this.matterImage.setScale(2).setAngle(angle);
    this.matterImage.setBounce(0);
    this.matterImage.setFriction(0, 0);
    this.matterImage.setMass(0.1);
    this.matterImage.thrust(0.01);

    this.matterImage.setOnCollide(this.onCollide.bind(this));
  }

  /**
   * When bullet hits an asteroid, destroy bullet and asteroid
   */
  onCollide({ bodyB: self, bodyA: other }: { bodyB: MatterJS.BodyType; bodyA: MatterJS.BodyType }): void {
    const bullet = self.gameObject as Phaser.Physics.Matter.Image;
    // TODO: 2020-02-07 Blockost Investigate "ERROR TypeError: Cannot read property 'destroy' of null"
    bullet.destroy();

    const gameObject = other.gameObject as Phaser.GameObjects.GameObject;

    if (gameObject.name.startsWith('asteroid')) {
      const asteroidHit = gameObject as Phaser.Physics.Matter.Image;
      asteroidHit.destroy();
    }
  }
}

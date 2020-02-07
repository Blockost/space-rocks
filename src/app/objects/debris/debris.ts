import * as Phaser from 'phaser';

export default class Debris extends Phaser.GameObjects.Image {
  private matterImage: Phaser.Physics.Matter.Image;

  constructor(scene: Phaser.Scene, x: number, y: number, angle: number) {
    super(scene, x, y, 'debris');

    this.matterImage = this.scene.matter.add.image(x, y, 'debris');

    this.matterImage.setScale(2).setAngle(angle);
    this.matterImage.setBounce(0);
    this.matterImage.setFriction(0, 0);
    this.matterImage.setMass(1);
    this.matterImage.thrust(0.005);
  }
}

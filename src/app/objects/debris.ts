import * as Phaser from 'phaser';
import { GameEvent } from 'src/app/utils/gameEvent';

export default class Debris extends Phaser.GameObjects.Image {
  private matterImage: Phaser.Physics.Matter.Image;

  constructor(scene: Phaser.Scene, x: number, y: number, angle: number) {
    super(scene, x, y, 'debris');

    this.matterImage = this.scene.matter.add.image(x, y, 'debris');

    this.matterImage.setName('debris');
    this.matterImage.setScale(2).setAngle(angle);
    this.matterImage.setBounce(0);
    this.matterImage.setFriction(0, 0);
    this.matterImage.setMass(1);
    this.matterImage.thrust(0.005);

    this.scene.events.emit(GameEvent.NEW_OBJECT_TO_UPDATE, this);
  }

  update(time: number, delta: number) {
    // Fade debris away and destroy when invisible
    this.matterImage.alpha -= 0.01;
    if (this.matterImage.alpha <= 0) {
      this.scene.events.emit(GameEvent.OBJECT_DESTROYED, this);
      this.matterImage.destroy();
      this.destroy();
    }
  }
}

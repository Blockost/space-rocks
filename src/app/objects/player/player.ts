import * as Phaser from 'phaser';
import Bullet from '../bullet/bullet';

export interface GameObjectOptions {
  wrap?: boolean;
}

export default class Player extends Phaser.GameObjects.Sprite {
  private matterSprite: Phaser.Physics.Matter.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'ship');

    this.matterSprite = this.scene.matter.add.sprite(x, y, 'ship', null, {
      plugin: {
        wrap: {
          min: { x: 0, y: 0 },
          max: { x: 800, y: 600 }
        }
      }
    });

    this.matterSprite.setMass(100);
    this.matterSprite.setScale(1.2);
    this.matterSprite.setName('Player');

    this.matterSprite.setOnCollide((data: Phaser.Types.Physics.Matter.MatterCollisionData) => {
      const asteroid = data.bodyA.gameObject as Phaser.GameObjects.GameObject;
      // XXX: 2020-02-06 Blockost Apparently, player is always objectB
      const player = data.bodyB.gameObject as Phaser.GameObjects.GameObject;

      // TODO: 2020-02-06 Blockost Once player hit an asteroid => explode + go to game over screen
      console.warn('GAME OVER DUDE');
    });
  }

  update(time: number, delta: number, cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (cursorKeys.left.isDown) {
      this.matterSprite.setAngularVelocity(-0.1);
    } else if (cursorKeys.right.isDown) {
      this.matterSprite.setAngularVelocity(0.1);
    } else if (cursorKeys.up.isDown) {
      this.matterSprite.thrust(0.03);
    } else {
      this.matterSprite.setAngularVelocity(0);
    }

    if (this.scene.input.keyboard.checkDown(cursorKeys.space, 500)) {
      this.fireBullet();
    }
  }

  private fireBullet() {
    new Bullet(this.scene, this.matterSprite.x, this.matterSprite.y, this.matterSprite.angle);
  }
}

import * as Phaser from 'phaser';
import Bullet from './bullet';
import onCollide from './behaviors/onCollide';
import { GameEvent } from '../utils/gameEvent';

export interface GameObjectOptions {
  wrap?: boolean;
}

export default class Player extends Phaser.GameObjects.Sprite implements onCollide {
  private readonly MAX_LIVES = 1;
  private remainingLives = this.MAX_LIVES;
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

    this.matterSprite.setName('player');
    this.matterSprite.setMass(100);
    this.matterSprite.setScale(1.2);

    this.matterSprite.setOnCollide(this.onCollide.bind(this));
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

  onCollide(collisionData: Phaser.Types.Physics.Matter.MatterCollisionData): void {
    if (!collisionData.bodyA.gameObject || !collisionData.bodyB.gameObject) {
      return;
    }

    const gameObjectA = collisionData.bodyA.gameObject as Phaser.GameObjects.GameObject;
    const gameObjectB = collisionData.bodyB.gameObject as Phaser.GameObjects.GameObject;

    let self: Phaser.GameObjects.GameObject;
    let other: Phaser.GameObjects.GameObject;
    if (gameObjectA.name === 'player') {
      self = gameObjectA;
      other = gameObjectB;
    } else {
      self = gameObjectB;
      other = gameObjectA;
    }

    console.log('self', self);
    console.log('other', other);

    if (other.name.startsWith('asteroid')) {
      this.remainingLives--;
      if (this.remainingLives <= 0) {
        this.scene.events.emit(GameEvent.PLAYER_DEAD);
      }
    }
  }
}

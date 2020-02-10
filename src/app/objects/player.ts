import * as Phaser from 'phaser';
import Bullet from './bullet';
import onCollide from './behaviors/onCollide';
import { GameEvent } from '../utils/gameEvent';

export interface GameObjectOptions {
  wrap?: boolean;
}

export default class Player extends Phaser.GameObjects.Sprite implements onCollide {
  static MAX_LIVES = 2;
  private remainingLives = Player.MAX_LIVES;
  private matterSprite: Phaser.Physics.Matter.Sprite;
  private hasImmunity = false;
  private currentImmunityTime = 0;
  private maxImmunityTime = 3000;
  private immunityAnimation: Phaser.Tweens.Tween;
  private hasBeenHit = false;
  private defaultColor = 0xffffff;
  private hitColor = 0xff0000;
  private currentHasBeenHitTime = 0;
  private maxHasBeenHitTime = 3000;

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

    // Animations
    this.immunityAnimation = this.scene.add.tween({
      targets: this.matterSprite,
      ease: 'Cubic',
      duration: 100,
      alpha: { from: 0, to: 1 },
      yoyo: true,
      repeat: -1,
      paused: true
    });

    // When starting, player has immunity for some time in case it spawns next to an asteroid
    this.makeImmune();
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

    // Update player statuses
    this.updateImmunity(delta);
    this.updateHasBeenHit(delta);
  }

  makeImmune() {
    this.hasImmunity = true;
    this.currentImmunityTime = 0;
    this.immunityAnimation.resume();
  }

  makeNotImmune() {
    this.hasImmunity = false;
    this.currentImmunityTime = 0;
    this.immunityAnimation.pause();
    this.matterSprite.setAlpha(1);
  }

  markAsHit() {
    this.hasBeenHit = true;
    this.matterSprite.setTintFill(this.hitColor);
    this.currentHasBeenHitTime = 0;
  }

  markAsNotHit() {
    this.hasBeenHit = false;
    this.matterSprite.setTintFill(this.defaultColor);
    this.currentHasBeenHitTime = 0;
  }

  private fireBullet() {
    new Bullet(this.scene, this.matterSprite.x, this.matterSprite.y, this.matterSprite.angle);
    this.scene.sound.play('fire');
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

    if (other.name.startsWith('asteroid')) {
      // Ignore if player has immunity
      if (this.hasImmunity) {
        return;
      }

      this.onHit();

      if (this.remainingLives <= 0) {
        this.scene.events.emit(GameEvent.PLAYER_DEAD);
      }
    }
  }

  private onHit() {
    this.remainingLives--;
    this.scene.events.emit(GameEvent.PLAYER_HIT, this.remainingLives);
    this.markAsHit();
    // When player has been hit, grant immunity for a short time
    this.makeImmune();
  }

  private updateImmunity(delta: number) {
    if (this.hasImmunity) {
      this.currentImmunityTime += delta;
      if (this.currentImmunityTime >= this.maxImmunityTime) {
        this.makeNotImmune();
      }
    }
  }

  private updateHasBeenHit(delta: number) {
    if (this.hasBeenHit) {
      this.currentHasBeenHitTime += delta;
      if (this.currentHasBeenHitTime >= this.maxHasBeenHitTime) {
        this.markAsNotHit();
      }
    }
  }
}

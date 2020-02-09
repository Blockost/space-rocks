import * as Phaser from 'phaser';
import * as MatterJS from 'matter';

export default interface onCollide {
  /**
   * Method to be called when a collision occurs with the given object.
   */

  onCollide(collisionData: Phaser.Types.Physics.Matter.MatterCollisionData): void;
}

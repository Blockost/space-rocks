import * as Phaser from 'phaser';
import * as MatterJS from 'matter';

export default interface onCollide {
  /**
   * Method to be called when a collision occurs with the given object.
   */
  onCollide({ bodyB: self, bodyA: other }: { bodyB: MatterJS.BodyType; bodyA: MatterJS.BodyType }): void;
}

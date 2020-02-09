import * as Phaser from 'phaser';

import BaseScene from './base.scene';

export default class UIScene extends BaseScene {
  static readonly KEY = 'UI';
  private score = 0;
  private scoreText: Phaser.GameObjects.Text;
  private readonly MAX_SCORE = 500;

  constructor() {
    super(UIScene.KEY);
  }

  create() {
    super.create();

    this.scoreText = this.add.text(10, 10, this.buildScoreText(), { fontSize: '32px', fill: '#fff' });
  }

  updateScore(scoreToAdd: number) {
    this.score += scoreToAdd;
    if (this.score > this.MAX_SCORE) {
      // TODO: 2020-02-08 Blockost Go to win screen
      console.log('WIN!');
    }

    this.scoreText.setText(this.buildScoreText());
  }

  private buildScoreText(): string {
    return `Score: ${this.score}`;
  }
}

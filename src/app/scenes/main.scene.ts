import BaseScene from './base.scene';
import Player from 'src/app/objects/player';
import Asteroid, { AsteroidType } from 'src/app/objects/asteroid';
import EnumHelper from 'src/app/utils/enumHelper';
import { SceneKeys } from './sceneKeys';
import { GameEvent } from '../utils/gameEvent';
import GameoverScene from './gameover.scene';

export default class MainScene extends BaseScene {
  private readonly MAX_SCORE = 500;
  private scoreText: Phaser.GameObjects.Text;
  private score = 0;
  private livesText: Phaser.GameObjects.Text;
  private player: Player;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super(SceneKeys.MainScene);
  }

  preload() {
    super.preload();

    this.load.image('ship', '/assets/sprites/spr_ship.png');
    this.load.image('asteroid_small', '/assets/sprites/spr_asteroid_small.png');
    this.load.image('asteroid_med', '/assets/sprites/spr_asteroid_med.png');
    this.load.image('asteroid_huge', '/assets/sprites/spr_asteroid_huge.png');
    this.load.image('bullet', '/assets/sprites/spr_bullet.png');
    this.load.image('debris', '/assets/sprites/spr_debris.png');
  }

  create() {
    super.create();

    // Enable input keys
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    // create asteroids
    for (let i = 0; i < 8; i++) {
      const asteroidType = EnumHelper.getRandomFromEnum(AsteroidType);
      new Asteroid(this, Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600), asteroidType);
    }

    // Create player
    this.player = new Player(this, 600, 100);

    // Create score
    this.scoreText = this.add.text(10, 10, this.buildScoreText(), { fontSize: '32px', fill: '#fff' });
    this.events.on(GameEvent.UPDATE_SCORE, this.onUpdateScore.bind(this));
    this.events.on(GameEvent.PLAYER_DEAD, this.onPlayerDead.bind(this));
  }

  update(time: number, delta: number) {
    super.update(time, delta);

    this.player.update(time, delta, this.cursorKeys);
  }

  private onUpdateScore(scoreToAdd: number) {
    this.score += scoreToAdd;
    this.scoreText.setText(this.buildScoreText());

    if (this.score >= this.MAX_SCORE) {
      this.scene.start(SceneKeys.WinScene);
      this.scene.remove(SceneKeys.MainScene);
    }
  }

  private buildScoreText(): string {
    return `Score: ${this.score}`;
  }

  private onPlayerDead() {
    this.scene.stop(SceneKeys.MainScene);
    this.scene.start(SceneKeys.GameoverScene).bringToTop();
  }
}

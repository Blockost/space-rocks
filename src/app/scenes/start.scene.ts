import BaseScene from './base.scene';
import TextStyleHelper from '../utils/textStyleHelper';
import { SceneKeys } from './sceneKeys';
import MainScene from './main.scene';

export default class StartScene extends BaseScene {
  constructor() {
    super(SceneKeys.StartScene);
  }

  preload() {
    super.preload();

    this.load.audio('theme', '/assets/sfx/msc_song.wav');
  }

  create() {
    super.create();

    const gameWidth = this.game.config.width as number;
    const headerStyle = TextStyleHelper.forHeader();
    const subheaderStyle = TextStyleHelper.forSubheader();
    const paragraphStyle = TextStyleHelper.forParagraph();

    this.add.text(gameWidth / 2, 100, 'SPACE ROCKS', headerStyle).setOrigin(0.5);

    this.add.text(gameWidth / 2, 200, 'Score 500 points to win!', paragraphStyle).setOrigin(0.5);
    this.add.text(gameWidth / 2, 250, 'UP: move', paragraphStyle).setOrigin(0.5);
    this.add.text(gameWidth / 2, 300, 'LEFT/RIGHT: change direction', paragraphStyle).setOrigin(0.5);
    this.add.text(gameWidth / 2, 350, 'SPACE: Shoot', paragraphStyle).setOrigin(0.5);

    this.add.text(gameWidth / 2, 500, '>> PRESS ENTER TO START <<', subheaderStyle).setOrigin(0.5);

    this.sound.play('theme', { loop: true });

    this.input.keyboard.addKey('ENTER').once('down', () => {
      this.sound.stopAll();
      this.scene.stop(SceneKeys.StartScene);
      this.scene.add(SceneKeys.MainScene, MainScene, true);
    });
  }
}

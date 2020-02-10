import BaseScene from './base.scene';
import { SceneKeys } from './sceneKeys';
import TextStyleHelper from '../utils/textStyleHelper';
import MainScene from './main.scene';

export default class GameoverScene extends BaseScene {
  constructor() {
    super(SceneKeys.GameoverScene);
  }

  preload() {
    super.preload();

    this.load.audio('lose', '/assets/sfx/snd_lose.wav');
  }

  create() {
    super.create();

    const gameWidth = this.game.config.width as number;

    const headerStyle = TextStyleHelper.forHeader();
    const subheaderStyle = TextStyleHelper.forSubheader();

    this.add.text(gameWidth / 2, 200, "YOU LOSE :'(", headerStyle).setOrigin(0.5);
    this.add.text(gameWidth / 2, 500, '>> PRESS ENTER TO RESTART <<', subheaderStyle).setOrigin(0.5);

    this.sound.play('lose');

    this.input.keyboard.addKey('ENTER').once('down', () => {
      // restart main scene
      this.scene.remove(SceneKeys.MainScene);
      this.scene.start(SceneKeys.StartScene);
      this.scene.stop(SceneKeys.GameoverScene);
    });
  }
}

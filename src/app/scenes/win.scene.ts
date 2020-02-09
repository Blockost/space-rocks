import BaseScene from './base.scene';
import { SceneKeys } from './sceneKeys';
import TextStyleHelper from '../utils/textStyleHelper';

export default class WinScene extends BaseScene {
  constructor() {
    super(SceneKeys.WinScene);
  }

  create() {
    super.create();

    const gameWidth = this.game.config.width as number;

    const headerStyle = TextStyleHelper.forHeader();
    const subheaderStyle = TextStyleHelper.forSubheader();

    this.add.text(gameWidth / 2, 200, 'YOU WON!', headerStyle).setOrigin(0.5);
    this.add.text(gameWidth / 2, 500, '>> PRESS ENTER TO RESTART <<', subheaderStyle).setOrigin(0.5);

    this.input.keyboard.addKey('ENTER').once('down', () => {
      // Reset main scene
      this.scene.remove(SceneKeys.MainScene);
      this.scene.stop(SceneKeys.WinScene);
      this.scene.start(SceneKeys.StartScene);
    });
  }
}

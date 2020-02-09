import BaseScene from './base.scene';
import MainScene from './main.scene';
import UIScene from './ui.scene';
import TextStyleHelper from '../utils/textStyleHelper';

export default class StartScene extends BaseScene {
  static readonly KEY = 'START';
  constructor() {
    super(StartScene.KEY);
  }

  create() {
    const gameWidth = this.game.config.width as number;

    super.create();

    const headerStyle = TextStyleHelper.forHeader();
    const subheaderStyle = TextStyleHelper.forSubheader();
    const paragraphStyle = TextStyleHelper.forParagraph();

    this.add.text(gameWidth / 2, 100, 'SPACE ROCKS', headerStyle).setOrigin(0.5);

    this.add.text(gameWidth / 2, 200, 'Score 500 points to win!', paragraphStyle).setOrigin(0.5);
    this.add.text(gameWidth / 2, 250, 'UP: move', paragraphStyle).setOrigin(0.5);
    this.add.text(gameWidth / 2, 300, 'LEFT/RIGHT: change direction', paragraphStyle).setOrigin(0.5);
    this.add.text(gameWidth / 2, 350, 'SPACE: Shoot', paragraphStyle).setOrigin(0.5);

    this.add.text(gameWidth / 2, 500, '>> PRESS ENTER TO START <<', subheaderStyle).setOrigin(0.5);

    this.input.keyboard.addKey('ENTER').once('down', () => {
      this.scene.start(UIScene.KEY);
      this.scene.start(MainScene.KEY);
      this.scene.remove(StartScene.KEY);
    });
  }
}

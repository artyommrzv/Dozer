import * as PIXI from '#pixi';
import { Screen, ScreenManager } from "../src/ScreenManager.mjs";
import { OptionsScreen } from './OptionsScreen.mjs';
import { MainMenuScreen } from './MainMenuScreen.mjs';

import { LEVELS } from '../LevelData.mjs';
import { Level } from '../Level.mjs';


class GameScreen extends Screen {
    menu;
    restart;
    play;
    stop;

    constructor() {
        super();
        this.initScreen();
    }

    initScreen() {
        this.menu = PIXI.Sprite.from(app.assets.images["home"]);
        this.menu.anchor.set(0.5);
        this.menu.x = this.menu.width + 240;
        this.menu.y = 80;
        this.menu.name = 'menu';
        this.display.addChild(this.menu);

        this.restart = PIXI.Sprite.from(app.assets.images["restart"]);
        this.restart.anchor.set(0.5);
        this.restart.x = this.restart.width + 240;
        this.restart.y =  this.menu.y + 100;
        this.restart.name = 'restart';
        this.display.addChild(this.restart);

        this.menu.interactive = true;
        this.restart.interactive = true;
        this.menu.on('pointerdown', this.onPointerDown);
        this.restart.on('pointerdown', this.onPointerDown);
    }

    enter() {
        console.log('enter to game screen')
    }
    
    exit() {
        console.log('exit from game screen')
    }

    onPointerDown = (event) => {
        if (event.target.name == 'menu') {
            this.screenManager.set( MainMenuScreen );
        }
    }

    destroy() {

    }
}

export { GameScreen }
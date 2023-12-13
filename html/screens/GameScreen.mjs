import * as PIXI from '#pixi';
import { Screen, ScreenManager } from "../managers/ScreenManager.mjs";
import { OptionsScreen } from './OptionsScreen.mjs';
import { MainMenuScreen } from './MainMenuScreen.mjs';

import { LEVELS } from '../LevelData.mjs';
import { Level } from '../Level.mjs';


class GameScreen extends Screen {
    menu;
    restart;
    play;
    stop;
    trace;

    constructor() {
        super();
        this.initScreen();
    }

    initScreen() {
        this.menu = PIXI.Sprite.from(app.assets.images["home"]);
        this.menu.anchor.set(0.5);
        this.menu.x = this.menu.width + 300;
        this.menu.y = 80;
        this.menu.name = 'menu';
        this.display.addChild(this.menu);

        this.restart = PIXI.Sprite.from(app.assets.images["restart"]);
        this.restart.anchor.set(0.5);
        this.restart.x = this.menu.x;
        this.restart.y =  this.menu.y + 50;
        this.restart.name = 'restart';
        this.display.addChild(this.restart);

        this.trace = PIXI.Sprite.from(app.assets.images["slat_trace"]);
        this.trace.anchor.set(0.5);
        this.trace.x = 200;
        this.trace.y = this.menu.y;
        this.trace.name = 'trace';
        this.display.addChild(this.trace);

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
            gsap.to(this.menu.scale, 0.1, {x:'-=0.1', y:'-=0.1', yoyo:true, repeat:1, ease:'sine.inOut', onComplete: () => {
                this.screenManager.set( MainMenuScreen );
            }});
            
        }
    }

    destroy() {

    }
}

export { GameScreen }
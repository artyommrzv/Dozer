import * as PIXI from '#pixi';
import { Screen } from "../src/ScreenManager.mjs";


class OptionsScreen extends Screen {
    constructor() {
        super();
        this.initScreen();
    }

    initScreen() {
        let bg = new PIXI.Graphics();
        bg.beginFill(0x00ffff, 1);
        bg.drawRect(-window.innerWidth*0.5, -window.innerHeight*0.5, window.innerWidth*2, window.innerHeight*2);
        bg.endFill();
        this.display.addChild(bg);

        // this.display.interactive = true;
        // this.display.on('pointerdown', this.onPointerDown);
    }

    enter() {
        console.log('enter to options screen')
    }
    
    exit() {
        console.log('exit from options screen')
    }

    // onPointerDown = (event) => {
    //     console.log(this.display)
    // }
}

export { OptionsScreen }
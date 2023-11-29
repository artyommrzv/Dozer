import * as PIXI from '#pixi';
import { Screen } from "../src/ScreenManager.mjs";


class OptionsScreen extends Screen {
    constructor() {
        super();
        this.initScreen();
    }

    initScreen() {
        let rect = new PIXI.Graphics();
        rect.beginFill(0xff0000, 1);
        rect.drawRect(-250, -250, 500, 500);
        rect.endFill();
        this.display.addChild(rect);
    }
}

export { OptionsScreen }
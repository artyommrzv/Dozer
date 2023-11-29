import * as PIXI from '#pixi';
import { Screen } from "../src/ScreenManager.mjs";


class MainMenuScreen extends Screen {
    constructor() {
        super();
        this.initScreen();
    }

    initScreen() {
        let circle = new PIXI.Graphics();
        circle.beginFill(0x000000, 1);
        circle.drawCircle(0, 0, 500);
        circle.endFill();
        this.display.addChild(circle);
    }
}

export { MainMenuScreen }
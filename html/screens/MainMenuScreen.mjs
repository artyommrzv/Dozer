import * as PIXI from '#pixi';
import { Screen, ScreenManager } from "../src/ScreenManager.mjs";
import { OptionsScreen } from './OptionsScreen.mjs';
import { GameScreen } from './GameScreen.mjs';

import { LEVELS } from '../LevelData.mjs';
import { Level } from '../Level.mjs';

class MainMenuScreen extends Screen {
    levelContainer;
    levelTexture;
    scoreTexture;
    stateTexture;
    levelText;
    logo;
    levels = [];

    constructor() {
        super();
        this.initScreen();
    }

    initScreen() {
<<<<<<< Updated upstream
        let circle = new PIXI.Graphics();
        circle.beginFill(0x000000, 1);
        circle.drawCircle(0, 0, 500);
        circle.endFill();
        this.display.addChild(circle);
=======
        let bg = new PIXI.Graphics();
        bg.beginFill(0x0D6AF5, 1);
        bg.drawRect(-window.innerWidth*0.5, -window.innerHeight*0.5, window.innerWidth*2, window.innerHeight*2);
        bg.endFill();
        this.display.addChild(bg);

        this.logo = new PIXI.Text('DOZER', {
            fontFamily: 'Arial',
            fontSize: 36,
            fontWeight: 'bold',
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round',
            fill: 0xffffff,
        });
        this.logo.x = 120;
        this.logo.y = 40;
        this.display.addChild(this.logo);

        let dx = 0, dy = 0;
        for (let i = 0; i < 10; i++) {
            this.levelContainer = new PIXI.Container();
            this.levelContainer.id = i;
            this.levelContainer.levelState = 'closed';
            this.levelContainer.x = 100 + 180 * dx;
            this.levelContainer.y = 200 + 180 * dy;
            this.display.addChild(this.levelContainer);

            if (i == 0) this.levelTexture = PIXI.Sprite.from(app.assets.images["level_state_active"]);
            else this.levelTexture = PIXI.Sprite.from(app.assets.images["level_state_inactive"]);
            this.levelTexture.anchor.set(0.5);
            this.levelContainer.addChild(this.levelTexture);
            this.levels.push(this.levelContainer);

            if (i == 0) this.stateTexture = PIXI.Sprite.from(app.assets.images["icon_state_level_opened"]);
            else this.stateTexture = PIXI.Sprite.from(app.assets.images["icon_state_level_closed"]);
            this.stateTexture.anchor.set(0.5);
            this.stateTexture.x = 0;
            this.stateTexture.y = 5;
            this.levelContainer.addChild(this.stateTexture);

            let arrCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            this.levelText = new PIXI.Text('level ' + arrCount[i], {
                fontFamily: 'Arial',
                fontSize: 18,
                fontWeight: 'bold',
                wordWrap: true,
                wordWrapWidth: 440,
                lineJoin: 'round',
            });
            this.levelText.anchor.set(0.5);
            this.levelText.y = -30;
            this.levelContainer.addChild(this.levelText);

            for (let j = 0; j < 3; j++) {
                this.scoreTexture = PIXI.Sprite.from(app.assets.images["icon_score_level_empty"]);
                this.scoreTexture.anchor.set(0.5);
                this.scoreTexture.x = -40 + 40*j;
                this.scoreTexture.y = 45;
                this.levelContainer.addChild(this.scoreTexture);
            }

            dx ++;
            if (dx == 2) {
                dx = 0;
                dy ++
            }

            if (i == 0) {
                this.levelContainer.levelState = 'opened';
            }
            
            this.levelContainer.interactive = true;
            this.levelContainer.on('pointerdown', this.onPointerDown);
        }

    }

    enter() {
        // console.log('enter to main menu screen')
    }

    exit() {
        // console.log('exit from main menu screen')
        this.destroy();
    }

    onPointerDown = (event) => {
        app.levelId = event.target.id;

        if (event.target.levelState == 'opened') {
            gsap.to(event.target.scale, 0.1, {x:'-=0.03', y:'-=0.03', yoyo:true, repeat:1, ease:'sine.inOut', onComplete: () => {
                app.level = new Level( LEVELS[app.levelId] );
                app.scene.add( app.level.model );

                gsap.to(this.display, 0.2, {alpha:0})
                // app.pixi.stage.visible = false;

                // this.screenManager.set( GameScreen );
            }});

        } else if (event.target.levelState == 'closed') {
            console.log('This level is not open');
        }

    }

    destroy() {
        this.display.visible = false;
>>>>>>> Stashed changes
    }
}

export { MainMenuScreen }
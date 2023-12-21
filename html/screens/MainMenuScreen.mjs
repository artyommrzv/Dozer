import * as PIXI from '#pixi';
import { Screen, ScreenManager } from "../managers/ScreenManager.mjs";
import { OptionsScreen } from './OptionsScreen.mjs';
import { GameScreen } from './GameScreen.mjs';

import { LEVELS } from '../LevelData.mjs';
import { Level } from '../Level.mjs';
import LevelIcon from './ElementsUI.mjs';

class MainMenuScreen extends Screen {
    levelContainer;
    levelTexture;
    scoreTexture;
    stateTexture;
    levelText;
    logo;
    background;
    levels = [];

    constructor() {
        super();
        this.initScreen();
    }

    initScreen() {
        this.background = new PIXI.Graphics();
        this.background.beginFill(0x45AE00, 1);
        this.background.drawRect( 0, 0, 1024, 1024);
        this.background.endFill();
        this.display.addChild( this.background );

        this.logo = new PIXI.Text('DOZER', {
            fontFamily: 'Baloo',
            fontSize: 36,
            fontWeight: 'bold',
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round',
            fill: 0xfff400,
        });        
        this.display.addChild( this.logo );      

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
            
            this.levelText = new PIXI.Text('level ' + (i+1), {
                fontFamily: 'Baloo',
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
        console.log('enter to main menu screen');
        app.resize.add( this.onResize )
    }

    exit() {
        console.log('exit from main menu screen')
        // this.destroy();
    }

    onPointerDown = (event) => {
        app.levelId = event.target.id;

        if (event.target.levelState == 'opened') {
            gsap.to(event.target.scale, 0.1, {x:'-=0.03', y:'-=0.03', yoyo:true, repeat:1, ease:'sine.inOut', onComplete: () => {
                app.level = new Level( LEVELS[app.levelId] );
                app.scene.add( app.level.model );

                this.screenManager.set( GameScreen );
            }});

        } else if (event.target.levelState == 'closed') {
            console.log('This level is not open');
        }

    }

    onResize = () => {
        this.background.width = window.innerWidth;
        this.background.height = window.innerHeight;

        this.logo.x = window.innerWidth/2 - this.logo.width/2;
        this.logo.y = 40;
    }

    destroy() {
        this.display.visible = false;
    }
}

export { MainMenuScreen }
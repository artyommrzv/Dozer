import * as PIXI from '#pixi';

export default class LevelIcon {
    sprite;
    background;
    scoreTexture;
    openedState;
    rankedState;
    stars = [];

    constructor( isOpen=false, score=0 ) {
        this.sprite = new PIXI.Container();
        this.openedState = isOpen;
        this.rankedState = score;

        this.background = PIXI.Sprite.from( app.assets.images["level_state_inactive"] );
        this.background.anchor.set(0.5);
        this.sprite.addChild( this.background );

        this.stateIndicator = PIXI.Sprite.from(app.assets.images["icon_state_level_closed"]);
        this.stateIndicator.anchor.set(0.5);
        this.stateIndicator.x = 0;
        this.stateIndicator.y = 5;
        this.sprite.addChild( this.stateIndicator );

        for (let i = 0; i < 3; i++) {
            let star = PIXI.Sprite.from(app.assets.images["icon_score_level_empty"]);
            star.anchor.set(0.5);
            star.x = -40 + 40*i;
            star.y = 45;
            this.sprite.addChild( star );
            this.stars.push( star );
        }
        if ( isOpen ) this.open();
        if ( score > 0 ) this.rank( score );
    }

    open() {
        this.background.texture = PIXI.Texture.from( app.assets.images["level_state_active" ] );
        this.stateIndicator.texture = PIXI.Texture.from( app.assets.images["icon_state_level_opened"] );
    }

    rank( score ) {
        this.rankedState = score;
        for ( let i=0; i<score; i++ ) {
            this.stars[i].texture = PIXI.Texture.from( app.assets.images["icon_score_level_completed"] );
        }
    }
}
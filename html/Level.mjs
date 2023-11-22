import { LevelData } from "./LevelData.mjs";

class Level {
    LevelData;
    display;

    objects = [];

    constructor( LevelData, scale=1 ) {
        this.LevelData = LevelData;
        this.#createDisplay();
        this.display.scale.set( scale )
    }

    hitTest( character, tileX, tileY ) {
        if ( this.data.getTileCode( tileX, tileY ) == LevelData.WALL ) return true;

        for ( let object of this.objects ) {
            if ( object.hitTest( tileX, tileY ) ) {
                character.onContact( object );
                object.onContact( character );
                return object.isObstacle;
            }
        }
        return false;
    }

    deleteObject( object ) {
        let index = this.objects.indexOf( object );
        if ( index != -1 ) this.objects.splice( index, 1 );
    }

    #createDisplay() {
        this.display = new PIXI.Container();
        this.#createStaticTiles();
        this.#createDynamicTiles();
    }

    #createStaticTiles() {

    }

    #createDynamicTiles() {

    }

    destroy(){
        for ( let object of this.objects){
            if ( object == app.player) continue;

            object.destroy();            
            this.display.destroy();
        };
        this.objects.length = 0;                    
        this.display.destroy();
    }
}

export { Level };
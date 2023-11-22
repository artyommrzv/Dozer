import { LevelData } from "./LevelData.mjs";
import * as THREE from '#three';
import { Tile } from "./Tiles.mjs";

class Level {
    levelData;
    model;

    objects = [];

    constructor( levelData ) {
        this.levelData = levelData;
        this.#createDisplay();        
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
        this.model = new THREE.Group();
        this.#createStaticTiles();
        this.#createDynamicTiles();
    }

    #createStaticTiles() {
        for ( let index=0; index < this.levelData.staticTiles.length; index++ ) {           
            let tileCode = this.levelData.staticTiles[ index ];
            let tileX = index % this.levelData.width;
            let tileY = Math.floor(index / this.levelData.width);

            switch (tileCode) {
                case LevelData.BOX:
                case LevelData.FLOOR:
                    let floorModel = app.assets.models.tileSet.getObjectByName("Ground").clone();
                    let floorTile = new Tile( floorModel, tileX, tileY );
                    this.model.add( floorTile.model );
                    break;

                case LevelData.WALL:
                    let wallModel = app.assets.models.tileSet.getObjectByName("Сontainer_02").clone();
                    let wallTile = new Tile( wallModel, tileX, tileY );
                    this.model.add( wallTile.model );
                    break;

                case LevelData.PLACE:
                    let pitModel = app.assets.models.tileSet.getObjectByName("Pit").clone();
                    let pitTile = new Tile( pitModel, tileX, tileY );
                    this.model.add( pitTile.model );
                    break;                
            }            
        }
    }

    #createDynamicTiles() {
        for ( let index=0; index < this.levelData.staticTiles.length; index++ ) {           
            let tileCode = this.levelData.staticTiles[ index ];
            let tileX = index % this.levelData.width;
            let tileY = Math.floor(index / this.levelData.width);

            switch (tileCode) {
                case LevelData.BOX:
                    let heapModel = app.assets.models.tileSet.getObjectByName("Heap").clone();
                    let heapTile = new Tile( heapModel, tileX, tileY );
                    this.model.add( heapTile.model );
                    break;
            }            
        }
    }

    destroy(){
        for ( let object of this.objects){
            if ( object == app.player) continue;

            object.destroy();            
            this.model.destroy();
        };
        this.objects.length = 0;                    
        this.model.destroy();
    }
}

export { Level };
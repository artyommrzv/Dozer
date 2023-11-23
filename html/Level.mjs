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
        if ( this.data.getTileCode( tileX, tileY ) == LevelData.CONTGREY ) return true;

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
                
                case LevelData.HEAP:
                case LevelData.GROUND:
                    let groundModel = app.assets.models.tileSet.getObjectByName("Ground").clone();
                    let groundTile = new Tile( groundModel, tileX, tileY );
                    this.model.add( groundTile.model );
                    break;

                case LevelData.CONTBLUE:
                    let contBlueModel = app.assets.models.tileSet.getObjectByName("Сontainer_01").clone();
                    let contBlueTile = new Tile( contBlueModel, tileX, tileY );
                    this.model.add( contBlueTile.model );
                    break;

                case LevelData.CONTGREY:
                    let contGreyModel = app.assets.models.tileSet.getObjectByName("Сontainer_02").clone();
                    let contGreyTile = new Tile( contGreyModel, tileX, tileY );
                    this.model.add( contGreyTile.model );
                    break;

                case LevelData.PIT:
                    let pitModel = app.assets.models.tileSet.getObjectByName("Pit").clone();
                    let pitTile = new Tile( pitModel, tileX, tileY );
                    this.model.add( pitTile.model );
                    break;
                
                case LevelData.FENCE:
                    let fenceModel = app.assets.models.tileSet.getObjectByName("Fence").clone();
                    let fenceTile = new Tile( fenceModel, tileX, tileY );
                    this.model.add( fenceTile.model );
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
                case LevelData.HEAP:
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
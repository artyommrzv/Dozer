import { LevelData } from "./LevelData.mjs";
import * as THREE from '#three';
import { Tile } from "./Tiles.mjs";
import { Player } from "./Player.mjs";
import { Heap } from "./Heap.mjs";

class Level {
    levelData;
    model;
    player;
    
    objects = [];

    constructor( levelData ) {
        this.levelData = levelData;
        this.#createDisplay();        
    }

    hitTest( tileX, tileY ) {
        if ( this.levelData.getTileCode( tileX, tileY ) != LevelData.GROUND ) return true;
    }

    deleteObject( object ) {
        let index = this.objects.indexOf( object );
        if ( index != -1 ) this.objects.splice( index, 1 );
        //this.model.remove( object.model );
    }

    getObjectByXY( tileX, tileY ) {
        for ( let object of this.objects ) {
            if ( object.hitTest( tileX, tileY ) ) return object;
        }
        return false;
    }

    isPit( tileX, tileY ) {
        if ( this.levelData.getTileCode( tileX, tileY ) == LevelData.PIT ) return true;
    }

    fillPit( heap, tileX, tileY  ) {
        this.levelData.setTileCode( LevelData.GROUND, tileX, tileY )
        this.deleteObject( heap );
        gsap.to( heap.model.scale, 0.5, { y: 0.05 } )
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

                case LevelData.GROUND:
                    let groundModel = app.assets.models.groundGrass.clone()
                    groundModel.traverse( child => {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.material = app.materials.grass;
                    } );
                    let groundTile = new Tile( groundModel, tileX, tileY );
                    this.model.add( groundTile.model );
                    break;

                case LevelData.CONTBLUE:
                    let contBlueModel = app.assets.models.tileSet.getObjectByName("Сontainer_01").clone();
                    let contBlueTile = new Tile( contBlueModel, tileX, tileY );
                    contBlueModel.rotation.y = Math.PI/2
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
                    // let fenceModel = app.assets.models.tileSet.getObjectByName("Fence").clone();
                    // let fenceTile = new Tile( fenceModel, tileX, tileY );
                    // this.model.add( fenceTile.model );
                    // break;  
                    
                    let imageFence = this.#getFence( tileX, tileY );
                    let fenceModel = app.assets.models.fence.getObjectByName( imageFence ).clone();
                    let fenceTile = new Tile( fenceModel, tileX, tileY );
                    this.model.add( fenceTile.model );
                    break;
            }            
        }
    }

    #createDynamicTiles() {
        for ( let objectName in this.levelData.objects ) {
            switch ( objectName ) {
                case 'player':                    
                    let playerModel = app.assets.models.bulldozer.getObjectByName("Bulldozer").clone();
                    let playerPosition = this.levelData.objects[ objectName ].position;                  
                    let player = new Player( playerModel );

                    this.player = player;
                    this.player.setTilePosition( ...playerPosition )            
                    this.model.add( this.player.model );
                    this.objects.push( this.player );
                    break;

                case 'heap':
                    for ( let heapPosition of this.levelData.objects[ objectName ] ) {
                        let heapModel = app.assets.models.tileSet.getObjectByName("Heap").clone();
                        let heapTile = new Heap( heapModel );

                        heapTile.setTilePosition( ...heapPosition.position)           
                        this.model.add( heapTile.model );
                        this.objects.push( heapTile );
                    }
                    break;
            }            
        }
    }

    #getPattern( tileX, tileY ){
        let topCode = this.levelData.getTileCode( tileX, tileY -1 );
        let rightCode = this.levelData.getTileCode( tileX +1, tileY );
        let downCode = this.levelData.getTileCode( tileX, tileY +1 );
        let leftCode = this.levelData.getTileCode( tileX -1, tileY );

        let getPattern = [topCode, rightCode, downCode, leftCode];
       
            // getPattern = getPattern.map( code => {
            // if(code === LevelData.ENTER) return LevelData.WALL;
            // if(code === LevelData.EXIT) return LevelData.FLOOR;

            // return code;
            // });

        return getPattern.join();

    }

    #getFence( tileX, tileY ){
        let pattern = this.#getPattern( tileX, tileY );

        switch( pattern ){
            case '0,5,1,5': return 'FenceTop';
            case '1,5,0,5': return 'FenceDown';
            case '5,1,5,0': return 'FenceRight';
            case '5,0,5,1': return 'FenceLeft';
            // case '2,2,1,2': return 'FenceDown';

            // case '1,2,0,2': return 'wall_down';

            // case '2,1,2,0': return 'wall_left';
            // case '2,2,2,0': return 'wall_left';

            // case '2,0,2,1': return 'wall_right';
            // case '2,0,2,2': return 'wall_right';

            // case '0,2,2,0': return 'wall_top_left';
            // case '0,0,2,2': return 'wall_top_right';
            
            // case '2,2,0,0': return 'wall_down_left';
            // case '2,2,2,0': return 'wall_down_left';

            case '1,1,5,5': return 'FenceTopRight';
            case '5,1,1,5': return 'FenceDownRight';

            case '0,5,5,0': return 'FenceTopLeft';
            case '0,0,5,5': return 'FenceTopRight';
            case '5,5,0,0': return 'FenceDownLeft';
            case '5,0,0,5': return 'FenceDownRight';
            
            // case '2,2,2,1': return 'wall_empty_left';
            // case '2,1,2,2': return 'wall_empty_right';
        }

        return 'FenceDownRight';
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
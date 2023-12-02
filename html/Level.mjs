import { LevelData } from "./LevelData.mjs";
import * as THREE from '#three';
import { Tile } from "./Tiles.mjs";
import { Player } from "./Tiles.mjs";
import { Heap } from "./Tiles.mjs";
import { Poddon } from "./Tiles.mjs";
import { TILE_SIZE } from "./LevelData.mjs";

class Level {
    levelData;
    model;
    player;
    
    objects = [];

    constructor( levelData ) {
        this.levelData = levelData;
        this.#createDisplay();
        this.model.position.x = (TILE_SIZE - this.levelData.width*TILE_SIZE)/2;
        this.model.position.z = (TILE_SIZE - this.levelData.height*TILE_SIZE)/2;        
    }

    hitTest( tileX, tileY ) {
        if ( this.levelData.getTileCode( tileX, tileY ) != LevelData.GROUND ) return true;
    }

    deleteObject( object ) {
        let index = this.objects.indexOf( object );
        if ( index != -1 ) this.objects.splice( index, 1 );
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

    isPad( tileX, tileY ) {
        if ( this.levelData.getTileCode( tileX, tileY ) == LevelData.PAD ) return true;
    }

    buildPad( poddon, tileX, tileY  ) {
        this.levelData.setTileCode( LevelData.PAD, tileX, tileY )
        this.deleteObject( poddon );
        gsap.to( poddon.model.scale, 0.5, { y: 0.05 } )
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

                case LevelData.CABIN:
                    let cabinModel = app.assets.models.cabin.clone()
                    cabinModel.traverse( child => {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.material = app.materials.container;
                    } );
                    let cabinTile = new Tile( cabinModel, tileX, tileY );
                    cabinModel.rotation.y = Math.PI/2
                    this.model.add( cabinTile.model );
                    break;

                case LevelData.CONTAINER:
                    let containerModel = app.assets.models.container.clone();
                    containerModel.traverse( child => {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.material = app.materials.container;
                    } );
                    let containerTile = new Tile( containerModel, tileX, tileY );
                    this.model.add( containerTile.model );
                    break;

                case LevelData.PIT:
                    let pitModel = app.assets.models.pit.clone()
                    pitModel.traverse( child => {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.material = app.materials.ground;
                    } );
                    let pitTile = new Tile( pitModel, tileX, tileY );
                    this.model.add( pitTile.model );
                    break;

                case LevelData.PAD:
                    let padModel = app.assets.models.groundSoil.clone()
                    padModel.traverse( child => {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.material = app.materials.soil;
                    } );
                    let padTile = new Tile( padModel, tileX, tileY );
                    this.model.add( padTile.model );
                    break;

                case LevelData.PLANE:
                    let planeModel = app.assets.models.plane.clone()
                    planeModel.traverse( child => {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.material = app.materials.rust;

                        if ( child.name.includes( 'Ground' ) ){
                            child.material = app.materials.grass;
                        };
                    } );
                    let planeTile = new Tile( planeModel, tileX, tileY );
                    this.model.add( planeTile.model );
                    break;
                
                case LevelData.FENCE:
                    let fenceName = this.#getFence( tileX, tileY );
                    let fenceModel = new THREE.Group();
                    fenceModel.add( app.assets.models.fence.getObjectByName(fenceName).clone() );
                    fenceModel.traverse( child => {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.material = app.materials.fence;
                    } );                   
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
                    let playerModel = app.assets.models.bulldozer
                    playerModel.traverse( child => {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.material = app.materials.bulldozer;
                    } );
                    let playerPosition = this.levelData.objects[ objectName ].position;                  
                    let player = new Player( playerModel );

                    this.player = player;
                    this.player.setTilePosition( ...playerPosition )            
                    this.model.add( this.player.model );
                    this.objects.push( this.player );
                    break;

                case 'heap':
                    for ( let heapPosition of this.levelData.objects[ objectName ] ) {
                        let heapModel = app.assets.models.heap.clone();
                        heapModel.traverse( child => {
                            child.castShadow = true;
                            child.receiveShadow = true;
                            child.material = app.materials.ground;
                        } );
                        let heapTile = new Heap( heapModel );

                        heapTile.setTilePosition( ...heapPosition.position)           
                        this.model.add( heapTile.model );
                        this.objects.push( heapTile );
                    }
                    break;

                case 'poddon':
                    for ( let poddonPosition of this.levelData.objects[ objectName ] ) {
                        let poddonModel = app.assets.models.poddon.clone()
                        poddonModel.traverse( child => {
                            child.castShadow = true;
                            child.receiveShadow = true;
                            child.material = app.materials.brick;

                            if ( child.name.includes( 'Poddon' ) ){
                                child.material = app.materials.wood;
                            };
                            if ( child.name.includes( 'Ground' ) ){
                                child.material = app.materials.grass;
                            };
                        } );
                        let poddonTile = new Poddon( poddonModel );

                        poddonTile.setTilePosition( ...poddonPosition.position)           
                        this.model.add( poddonTile.model );
                        this.objects.push( poddonTile );
                    }
                    break;    
            }            
        }
    }

    #getPattern( tileX, tileY ){
        let topCode = this.levelData.getTileCode( tileX, tileY - 1);
        let downCode = this.levelData.getTileCode( tileX, tileY + 1);
        let leftCode = this.levelData.getTileCode( tileX - 1, tileY);
        let rightCode = this.levelData.getTileCode( tileX + 1, tileY);
        
        let pattern = [topCode, rightCode, downCode, leftCode];

        return pattern.join();
    }

    #getFence( tileX, tileY ){
        let pattern = this.#getPattern( tileX, tileY );

        
        switch (pattern) {
            case '0,5,1,5': return 'FenceTop';
            case '1,5,1,5': return 'FenceTop';
            case '1,5,5,5': return 'FenceTop';
            case '1,1,1,5': return 'FenceTop';
            case '1,5,1,1': return 'FenceTop';
            case '5,5,1,5': return 'FenceTop';
            case '0,5,2,5': return 'FenceTop';
            case '0,5,3,5': return 'FenceTop';
            case '0,5,4,5': return 'FenceTop';
            case '0,5,6,5': return 'FenceTop';
            case '0,5,7,5': return 'FenceTop';

            case '1,5,0,5': return 'FenceDown';
            case '2,5,0,5': return 'FenceDown';
            case '3,5,0,5': return 'FenceDown';
            case '4,5,0,5': return 'FenceDown';
            case '6,5,0,5': return 'FenceDown';
            case '7,5,0,5': return 'FenceDown';

            case '5,1,5,0': return 'FenceLeft';
            case '5,2,5,0': return 'FenceLeft';
            case '5,3,5,0': return 'FenceLeft';
            case '5,4,5,0': return 'FenceLeft';
            case '5,6,5,0': return 'FenceLeft';
            case '5,7,5,0': return 'FenceLeft';
            case '5,5,5,0': return 'FenceLeft';

            case '5,0,5,1': return 'FenceRight';
            case '5,0,5,2': return 'FenceRight';
            case '5,0,5,3': return 'FenceRight';
            case '5,0,5,4': return 'FenceRight';
            case '5,0,5,6': return 'FenceRight';
            case '5,0,5,7': return 'FenceRight';
            case '5,0,5,5': return 'FenceRight';

            case '0,5,5,0': return 'FenceTopLeft';
            case '5,5,5,0': return 'FenceTopLeft';

            case '0,0,5,5': return 'FenceTopRight';
            case '5,0,5,5': return 'FenceTopRight';

            case '5,5,0,0': return 'FenceDownLeft';
            case '5,0,0,5': return 'FenceDownRight';            
        }
        return 'Ground';
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
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

                case LevelData.PODDON:
                    let poddonModel = app.assets.models.poddon.clone()
                    poddonModel.traverse( child => {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.material = app.materials.poddon;
                    } );
                    let poddonTile = new Tile( poddonModel, tileX, tileY );
                    this.model.add( poddonTile.model );
                    break;

                case LevelData.PLANE:
                    let planeModel = app.assets.models.plane.clone()
                    planeModel.traverse( child => {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.material = app.materials.rust;
                    } );
                    let planeTile = new Tile( planeModel, tileX, tileY );
                    this.model.add( planeTile.model );
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
                            child.material = app.materials.soil;
                        } );
                        let heapTile = new Heap( heapModel );

                        heapTile.setTilePosition( ...heapPosition.position)           
                        this.model.add( heapTile.model );
                        this.objects.push( heapTile );
                    }
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
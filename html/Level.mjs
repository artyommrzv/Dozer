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

<<<<<<< HEAD
                // case LevelData.CONTBLUE:
                //     let contBlueModel = app.assets.models.tileSet.getObjectByName("Сontainer_01").clone();
                //     let contBlueTile = new Tile( contBlueModel, tileX, tileY );
                //     contBlueModel.rotation.y = Math.PI/2
                //     this.model.add( contBlueTile.model );
                //     break;

                // case LevelData.CONTGREY:
                //     let contGreyModel = app.assets.models.tileSet.getObjectByName("Сontainer_02").clone();
                //     let contGreyTile = new Tile( contGreyModel, tileX, tileY );
                //     this.model.add( contGreyTile.model );
                //     break;
=======
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
>>>>>>> main

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
                        child.material = app.materials.brick;

                        if ( child.name.includes( 'Poddon' ) ){
                            child.material = app.materials.wood;
                        };
                        if ( child.name.includes( 'Ground' ) ){
                            child.material = app.materials.grass;
                        };
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

                        if ( child.name.includes( 'Ground' ) ){
                            child.material = app.materials.grass;
                        };
                    } );
                    let planeTile = new Tile( planeModel, tileX, tileY );
                    this.model.add( planeTile.model );
                    break;
                
                case LevelData.FENCE:
<<<<<<< HEAD
                    // let fenceModel = app.assets.models.tileSet.getObjectByName("Fence").clone();
                    // let fenceTile = new Tile( fenceModel, tileX, tileY );
                    // this.model.add( fenceTile.model );
                    // break;  
                    
                    let imageFence = this.#getFence( tileX, tileY );
                    let fenceModel = app.assets.models.fence.getObjectByName( imageFence ).clone();
=======
                    let fenceName = this.#getFence( tileX, tileY );
                    let fenceModel = new THREE.Group();
                    fenceModel.add( app.assets.models.fence.getObjectByName(fenceName).clone() );
                    fenceModel.traverse( child => {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.material = app.materials.fence;
                    } );                   
>>>>>>> main
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
<<<<<<< HEAD
                    let playerModel = app.assets.models.bulldozer.getObjectByName("Bulldozer").clone();
=======
                    let playerModel = app.assets.models.bulldozer
                    playerModel.traverse( child => {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.material = app.materials.bulldozer;
                    } );
>>>>>>> main
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
            }            
        }
    }

    #getPattern( tileX, tileY ){
<<<<<<< HEAD
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

=======
        let topCode = this.levelData.getTileCode( tileX, tileY - 1);
        let downCode = this.levelData.getTileCode( tileX, tileY + 1);
        let leftCode = this.levelData.getTileCode( tileX - 1, tileY);
        let rightCode = this.levelData.getTileCode( tileX + 1, tileY);
        
        let pattern = [topCode, rightCode, downCode, leftCode];

        return pattern.join();
>>>>>>> main
    }

    #getFence( tileX, tileY ){
        let pattern = this.#getPattern( tileX, tileY );

<<<<<<< HEAD
        switch( pattern ){
<<<<<<< Updated upstream
            case '0,5,1,5': return 'FenceTop';
            case '1,5,0,5': return 'FenceDown';
            case '5,1,5,0': return 'FenceRight';
            case '5,0,5,1': return 'FenceLeft';
            // case '2,2,1,2': return 'FenceDown';
=======
            case '0,2,1,2': return 'Fence026';
            // case '1,2,1,2': return 'wall_top';
            // case '1,1,1,2': return 'wall_top';
            // case '1,2,1,1': return 'wall_top';
            // case '2,2,1,2': return 'wall_top';
>>>>>>> Stashed changes

            // case '1,2,0,2': return 'wall_down';

            // case '2,1,2,0': return 'wall_left';
            // case '2,2,2,0': return 'wall_left';

            // case '2,0,2,1': return 'wall_right';
            // case '2,0,2,2': return 'wall_right';

            // case '0,2,2,0': return 'wall_top_left';
            // case '0,0,2,2': return 'wall_top_right';
            
            // case '2,2,0,0': return 'wall_down_left';
            // case '2,2,2,0': return 'wall_down_left';

<<<<<<< Updated upstream
            case '1,1,5,5': return 'FenceTopRight';
            case '5,1,1,5': return 'FenceDownRight';

            case '0,5,5,0': return 'FenceTopLeft';
            case '0,0,5,5': return 'FenceTopRight';
            case '5,5,0,0': return 'FenceDownLeft';
            case '5,0,0,5': return 'FenceDownRight';
=======
            // case '2,0,0,2': return 'wall_down_right';
            // case '2,0,2,2': return 'wall_down_right';

            // case '1,2,2,1': return 'wall_turn_down_left';
            // case '1,1,2,2': return 'wall_turn_down_right';
            // case '2,2,1,1': return 'wall_turn_top_left';
            // case '2,1,1,2': return 'wall_turn_top_right';
>>>>>>> Stashed changes
            
            // case '2,2,2,1': return 'wall_empty_left';
            // case '2,1,2,2': return 'wall_empty_right';
        }

<<<<<<< Updated upstream
        return 'FenceDownRight';
=======
        return 'Ground';
>>>>>>> Stashed changes
=======
        
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
>>>>>>> main
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
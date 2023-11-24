import { TILE_SIZE } from './LevelData.mjs';

class Tile {
    model;

    isUpdated = true;
    isObstacle = true;

    tileX;
    tileY;

    constructor( model, tileX=0, tileY=0 ) {
        this.tileX = tileX;
        this.tileY = tileY;
        this.model = model;       
        this.updateDisplay(0);
    }

    hitTest( tileX, tileY ) {
        return this.tileX === tileX && this.tileY === tileY;
    }

    updateDisplay( time=0.25 ) {
        if ( !this.isUpdated ) return;

        let newX = TILE_SIZE * this.tileX;
        let newZ = TILE_SIZE * this.tileY;
        
        this.isUpdated = false;
        this.model.position.x = newX;
        this.model.position.z = newZ;
        // gsap.to( this.model.position, time, { x: newX, z:newZ, ease:'sine.out', onComplete: () => this.isUpdated=true });
    }

    setTilePosition( tileX, tileY ) {
        this.tileX = tileX;
        this.tileY = tileY;

        //gsap.killTweensOf( this.model.position );
        this.isUpdated = true;
        this.model.position.x = TILE_SIZE * this.tileX;
        this.model.position.y = TILE_SIZE * this.tileY;
    }   

    onContact() {        
    }

    destroy() {
    }
}

export { Tile };
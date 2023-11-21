import TILE_SIZE from './html/Data.mjs';

class Tile {
    display;

    isUpdated = true;
    isObstacle = true;

    tileX;
    tileY;

    constructor( display, tileX=0, tileY=0 ) {
        this.tileX = tileX;
        this.tileY = tileY;
        this.display = display;
        display.anchor.set( 0.5 );
        this.updateDisplay(0)
    }

    hitTest( tileX, tileY ) {
        return this.tileX === tileX && this.tileY === tileY;
    }

    updateDisplay( time=0.25 ) {
        if ( !this.isUpdated ) return;

        let newX = TILE_SIZE * this.tileX;
        let newY = TILE_SIZE * this.tileY;
        
        this.isUpdated = false;
        gsap.to( this.display, time, { x: newX, y:newY, ease:'sine.out', onComplete: () => this.isUpdated=true });
    }

    setTilePosition( tileX, tileY) {
        this.tileX = tileX;
        this.tileY = tileY;

        gsap.killTweensOf( this.display );
        this.isUpdated = true;
        this.display.x = TILE_SIZE * this.tileX;
        this.display.y = TILE_SIZE * this.tileY;
    }

    destroy() {
        gsap.killTweensOf( this.display );
        // метод/функция удаления Tile.display    
    }
}

export { Tile };
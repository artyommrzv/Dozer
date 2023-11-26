import { Tile } from "./Tiles.mjs";

class Heap extends Tile {
    
    constructor( model, tileX, tileY ) {
        super( model, tileX, tileY );
    }

    move ( dx, dy, time=0.25 ) {
        if ( !this.isUpdated ) return;

        let futureX = this.tileX + dx;
        let futureY = this.tileY + dy;

        if ( app.level.hitTest( this, futureX, futureY ) ) return;

        this.tileX += dx;
        this.tileY += dy;        

        this.updateDisplay(time);
    }
    
    destroy() {
        super.destroy();
    }
}

export { Heap }
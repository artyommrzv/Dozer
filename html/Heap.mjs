import { Tile } from "./Tiles.mjs";

class Heap extends Tile {
    
    constructor( model, tileX, tileY ) {
        super( model, tileX, tileY );
    }

    move ( dx, dy, time=0.25 ) {
        if ( !this.isUpdated ) return;

        let futureX = this.tileX + dx;
        let futureY = this.tileY + dy;

        if ( app.level.isPit( futureX, futureY ) ){
            app.level.fillPit( this, futureX, futureY );
        } else if ( app.level.hitTest( futureX, futureY ) ) return false;
        let object = app.level.getObjectByXY( futureX, futureY );
        if ( object ) return false;
        
        this.tileX += dx;
        this.tileY += dy;        

        this.updateDisplay(time);
        return true;
    }
    
    destroy() {
        super.destroy();
    }
}

export { Heap }
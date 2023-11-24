import { Tile } from "./Tiles.mjs";

class Player extends Tile {
    
    constructor( model, tileX, tileY ) {
        super( model, tileX, tileY );

        document.addEventListener( 'keydown', this.onKeydown );
    }

    onKeydown = (event) => {
        let dx = 0;
        let dy = 0;

        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                dy = -1;
                break;
            case 'ArrowDown':    
            case 'KeyS':
                dy = 1;
                break;
            case 'ArrowLeft':    
            case 'KeyA':
                dx = -1;
                break;
            case 'ArrowRight':        
            case 'KeyD':
                dx = 1;
                break;
        }

        this.move(dx, dy);
    }   

    move ( dx, dy, time=0.25 ) {
        if ( !this.isUpdated ) return;

        let futureX = this.tileX + dx;
        let futureY = this.tileY + dy;

        if ( app.level.hitTest( this, futureX, futureY ) ) return;

        if (dx != 0) this.display.scale.x = dx > 0 ? 1 : -1;

        this.tileX += dx;
        this.tileY += dy;

        this.updateDisplay(time);
    }
    
    destroy() {
        super.destroy();
        document.removeEventListener('keydown', this.onKeydown);
    }
}

export { Player }
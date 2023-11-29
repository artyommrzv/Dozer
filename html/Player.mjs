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

        this.move(dx, dy, 0.4);
    }   

    move ( dx, dy, time=0.25 ) {
        if ( !this.isUpdated ) return;

        let futureX = this.tileX + dx;
        let futureY = this.tileY + dy;
        
        let toRotate = Math.atan2( dy, -dx );
        this.model.rotation.y %= 2*Math.PI;
        if ( this.model.rotation.y - toRotate > Math.PI ) toRotate += 2*Math.PI;
        if ( this.model.rotation.y - toRotate < -Math.PI ) toRotate -= 2*Math.PI;
        let rotateTime = 0.2 * Math.abs(this.model.rotation.y - toRotate) / (Math.PI*0.5);

        gsap.to( this.model.rotation, rotateTime, { y: toRotate, ease: 'quad.out' } );

        if ( app.level.hitTest( futureX, futureY ) ) return false;
        let object = app.level.getObjectByXY( futureX, futureY );
        if ( object && !object.move( dx, dy ) ) return false;
        
        this.tileX += dx;
        this.tileY += dy;        

        this.updateDisplay(time);
        return true;
    }
    
    destroy() {
        super.destroy();
        document.removeEventListener('keydown', this.onKeydown);
    }
}

export { Player }
import { TILE_SIZE } from './LevelData.mjs';
import * as THREE from '#three';

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
        //this.model.position.x = newX;
        //this.model.position.z = newZ;
        gsap.to( this.model.position, time , { x: newX, z:newZ, ease:'quad.out', onComplete: () => this.isUpdated=true });
    }

    setTilePosition( tileX, tileY ) {
        this.tileX = tileX;
        this.tileY = tileY;

        gsap.killTweensOf( this.model.position );
        this.isUpdated = true;
        this.model.position.x = TILE_SIZE * this.tileX;
        this.model.position.z = TILE_SIZE * this.tileY;
    }   

    onContact() { 
    }

    destroy() {
    }
}

class Player extends Tile {
    
    constructor( model, tileX, tileY ) {
        super( model, tileX, tileY );
        
        this.model = new THREE.Group();
        this.visualModel = model;

        document.addEventListener( 'keydown', this.onKeydown );
        this.model.add( this.visualModel, app.camera )
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

        if( dx==0 && dy==0) return;
        this.move(dx, dy, 0.4);
    }   

    move ( dx, dy, time=0.25 ) {
        if ( !this.isUpdated ) return;

        let futureX = this.tileX + dx;
        let futureY = this.tileY + dy;
        
        let toRotate = Math.atan2( dy, -dx );
        this.visualModel.rotation.y %= 2*Math.PI;
        if ( this.visualModel.rotation.y - toRotate > Math.PI ) toRotate += 2*Math.PI;
        if ( this.visualModel.rotation.y - toRotate < -Math.PI ) toRotate -= 2*Math.PI;
        let rotateTime = 0.2 * Math.abs(this.visualModel.rotation.y - toRotate) / (Math.PI*0.5);

        gsap.to( this.visualModel.rotation, rotateTime, { y: toRotate, ease: 'quad.out' } );

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

class Poddon extends Tile {
    
    constructor( model, tileX, tileY ) {
        super( model, tileX, tileY );
    }

    move ( dx, dy, time=0.25 ) {
        if ( !this.isUpdated ) return;

        let futureX = this.tileX + dx;
        let futureY = this.tileY + dy;

        if ( app.level.isPad( futureX, futureY ) ){
            app.level.buildPad( this, futureX, futureY );
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

export { Tile, Heap, Player, Poddon };
import * as THREE from '#three';
import { Level } from '../Level.mjs';

export default class FollowCamera{
    camera;
    target;
    offset;
    lookTarget = new THREE.Vector3();
    lerpSpeed;

    constructor( camera, target, offset, lerpSpeed=1 ){
        this.camera = camera;
        this.target = target;
        this.lookTarget.copy( target.position );
        this.offset = offset;
        this.lerpSpeed = lerpSpeed;
    }

    update(){
        this.camera.position.x += this.lerpSpeed * (this.target.position.x + this.offset.x )/4;
        this.camera.position.y += this.lerpSpeed * (this.target.position.y + this.offset.y )/4;
        this.camera.position.z += this.lerpSpeed * (this.target.position.z + this.offset.z )/4;
        
        this.lookTarget.lerp( this.target.position, 1/4 * this.lerpSpeed )
        this.camera.lookAt( this.target.position );
    }
}
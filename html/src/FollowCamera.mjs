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
        this.camera.position.x += this.lerpSpeed * (this.target.position.x + this.offset.x - this.camera.position.x);
        this.camera.position.y += this.lerpSpeed * (this.target.position.y + this.offset.y - this.camera.position.y);
        this.camera.position.z += this.lerpSpeed * (this.target.position.z + this.offset.z - this.camera.position.z);
        
        this.lookTarget.lerp( this.target.position, this.lerpSpeed )
        this.camera.lookAt( this.lookTarget );
    }
}
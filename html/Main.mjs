import ImageLoader from "./src/ImageLoader.mjs";
import ModelLoader from "./src/ModelLoader.mjs";
import * as THREE from './libs/three/three.module.js';

console.log(THREE)

class Main {
    materials = {};
    renderer;
    scene;
    camera;

    constructor() {
        this.initRenderer();
        this.initScene();
        this.initCamera();
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.renderer.shadowMap.enabled = true;
        document.body.appendChild(this.renderer.domElement);
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x8FDFFF);
    }

    initCamera() {
        this.camera = new THREE.Camera();
        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
    }
}

let main = new Main();

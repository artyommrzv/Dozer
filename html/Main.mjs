import AssetsManager from './src/AssetsManager.mjs';
import * as THREE from '#three';
import { Level } from './Level.mjs';
import { LEVELS } from './LevelData.mjs';

class Main {
    assets;   
    renderer;
    scene;
    camera;
    level;
    materials = {};

    constructor() {
        this.assets = new AssetsManager();
        this.assets.load( () => {
            this.initScene();
            this.initCamera();
            this.initLight();
            this.initMaterials();
            this.initRenderer();
            this.initLevel();
            this.gameLoop();
        });   
    }

    initLevel() {
        this.level = new Level( LEVELS[0] );
        app.scene.add( this.level.model );
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x8FDFFF );
    }

    initCamera() {
        this.camera = new THREE.Camera();
        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
        this.camera.position.set( 36, 50, 70 );
        this.camera.lookAt( 36, 0, 40 );
        this.scene.add(this.camera);
    }

    initLight() {
        let light = new THREE.DirectionalLight( 0xffffff, 0.8 );
        light.castShadow = true;
        light.position.set( -1, 5, 2 );
        this.scene.add( light );
    
        light.shadow.camera.left = -20;
        light.shadow.camera.right = 20;
        light.shadow.camera.top = 20;
        light.shadow.camera.bottom = -20;
        light.shadow.radius = 10;
        
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
    
        let ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 ); 
        this.scene.add( ambientLight );
    };

    initMaterials() {
        let setTextureDefaultSettings = ( texture, magFilter=THREE.NearestFilter ) => {
            texture.magFilter = magFilter;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.flipY = false;            
        };

        let grassMap = new THREE.Texture( app.assets.images.greenGrass );
        grassMap.needsUpdate = true;
        setTextureDefaultSettings( grassMap );        
        this.materials.grass = new THREE.MeshLambertMaterial({
            map: grassMap
        });

        let bulldozerMap = new THREE.Texture( app.assets.images.bulldozer );
        bulldozerMap.needsUpdate = true;
        setTextureDefaultSettings( bulldozerMap );        
        this.materials.bulldozer = new THREE.MeshLambertMaterial({
            map: bulldozerMap
        });

        let fenceMap = new THREE.Texture( app.assets.images.concrete );
        fenceMap.needsUpdate = true;
        setTextureDefaultSettings( fenceMap );        
        this.materials.fence = new THREE.MeshLambertMaterial({
            map: fenceMap
        });

        let containerMap = new THREE.Texture( app.assets.images.container );
        containerMap.needsUpdate = true;
        setTextureDefaultSettings( containerMap );        
        this.materials.container = new THREE.MeshLambertMaterial({
            map: containerMap
        });

        let soilMap = new THREE.Texture( app.assets.images.ground );
        soilMap.needsUpdate = true;
        setTextureDefaultSettings( soilMap );        
        this.materials.soil = new THREE.MeshLambertMaterial({
            map: soilMap
        });

        let rustMap = new THREE.Texture( app.assets.images.rust );
        rustMap.needsUpdate = true;
        setTextureDefaultSettings( rustMap );        
        this.materials.rust = new THREE.MeshLambertMaterial({
            map: rustMap
        });
    }
    
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
            powerPreference: "high-performance"
        });
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        this.renderer.shadowMap.enabled = true;
        document.body.appendChild( this.renderer.domElement );

        this.renderer.render( this.scene, this.camera );
    }

    gameLoop = () => {
        this.renderer.render( this.scene, this.camera );
        requestAnimationFrame( this.gameLoop ); 
    }

}

globalThis.app = new Main();
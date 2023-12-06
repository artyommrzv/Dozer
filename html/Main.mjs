import AssetsManager from './src/AssetsManager.mjs';
import GameLoopManager from './src/GameLoopManager.mjs';
import * as THREE from '#three';
import * as PIXI from '#pixi';
import { Level } from './Level.mjs';
import { LEVELS } from './LevelData.mjs';
import { ScreenManager } from './src/ScreenManager.mjs';
import { MainMenuScreen } from './screens/MainMenuScreen.mjs';
import { OptionsScreen } from './screens/OptionsScreen.mjs';
import { GameScreen } from './screens/GameScreen.mjs';
import FollowCamera from './src/FollowCamera.mjs';


class Main {
    assets;   
    renderer;
    scene;
    camera;
    level;
    levelId = -1;
    materials = {};
    loop;
    pixi;
    screenManager;

    constructor() {
        this.assets = new AssetsManager();
        this.assets.load( () => {
            this.initScene();
            this.initCamera();
            this.initLight();
            this.initMaterials();
            this.initRenderer();
            this.initLevel();
            this.initPIXI();
            this.initScreens();
            this.initGameLoop();
        });   
    }

    initLevel() {
        // this.level = new Level( LEVELS[0] );
        // app.scene.add( this.level.model );
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x8FDFFF );
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
        this.camera.position.set( 0, 40, 40 );
        this.camera.lookAt( 0, 0, 0 );
    }

    initFollowCamera(){
        let followCamera = new FollowCamera( this.camera, app.level.player.model, new THREE.Vector3( 0, 10, 0 ) );
        this.followCamera = followCamera;
    }

    initLight() {
        let light = new THREE.DirectionalLight( 0xffffff, 2.4 );
        light.castShadow = true;
        light.position.set( 120, 250, -160 );
        this.scene.add( light );
    
        light.shadow.camera.left = -100;
        light.shadow.camera.right = 100;
        light.shadow.camera.top = 100;
        light.shadow.camera.bottom = -100;
        light.shadow.radius = 5;
        
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
    
        let ambientLight = new THREE.AmbientLight( 0xffffff, 0.8 ); 
        this.scene.add( ambientLight );
    };

    initMaterials() {
        let grassMap = new THREE.Texture( app.assets.images.greenGrass );
        this.setTextureDefaultSettings( grassMap );        
        this.materials.grass = new THREE.MeshLambertMaterial( {
            map: grassMap
        });

        let bulldozerMap = new THREE.Texture( app.assets.images.bulldozer );        
        this.setTextureDefaultSettings( bulldozerMap );        
        this.materials.bulldozer = new THREE.MeshLambertMaterial({
            map: bulldozerMap
        });

        let fenceMap = new THREE.Texture( app.assets.images.concrete );       
        this.setTextureDefaultSettings( fenceMap );        
        this.materials.fence = new THREE.MeshLambertMaterial({
            map: fenceMap
        });

        let containerMap = new THREE.Texture( app.assets.images.container );       
        this.setTextureDefaultSettings( containerMap );        
        this.materials.container = new THREE.MeshLambertMaterial({
            map: containerMap
        });

        let groundMap = new THREE.Texture( app.assets.images.ground );        
        this.setTextureDefaultSettings( groundMap );        
        this.materials.ground = new THREE.MeshLambertMaterial({
            map: groundMap
        });

        let soilMap = new THREE.Texture( app.assets.images.soil );       
        this.setTextureDefaultSettings( soilMap );        
        this.materials.soil = new THREE.MeshLambertMaterial({
            map: soilMap
        });

        let rustMap = new THREE.Texture( app.assets.images.rust );       
        this.setTextureDefaultSettings( rustMap );        
        this.materials.rust = new THREE.MeshLambertMaterial({
            map: rustMap
        });

        let brickMap = new THREE.Texture( app.assets.images.brick );       
        this.setTextureDefaultSettings( brickMap );        
        this.materials.brick = new THREE.MeshLambertMaterial({
            map: brickMap
        });

        let woodMap = new THREE.Texture( app.assets.images.wood );       
        this.setTextureDefaultSettings( woodMap );        
        this.materials.wood = new THREE.MeshLambertMaterial({
            map: woodMap
        });

    }

    setTextureDefaultSettings( texture, magFilter=THREE.NearestFilter ) {
        texture.needsUpdate = true;
        texture.magFilter = magFilter;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;
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
        this.renderer.domElement.style.position = "absolute";
    
    }

    initPIXI() {
        this.pixi = new PIXI.Application({
            backgroundAlpha: 0,
            antialias: true,
            resizeTo: window,
        });

        document.body.appendChild(this.pixi.view);
        this.pixi.view.style.position = "absolute";
        this.pixi.view.style.top = "0px";
        this.pixi.view.style.left = "0px";
    }

    initScreens() {
        this.screenManager = new ScreenManager(
            new MainMenuScreen(),
            new OptionsScreen(),
            new GameScreen(),
        ); 

        this.screenManager.set( MainMenuScreen, undefined, true );
        this.pixi.stage.addChild(this.screenManager.display);
        
    }

    initGameLoop() {
        this.loop = new GameLoopManager();
        this.loop.add(this.update);
    }

    update = () => {
        this.renderer.render( this.scene, this.camera );
        //this.followCamera.update()
    }
}


globalThis.app = new Main();
import AssetsManager from './src/AssetsManager.mjs';
<<<<<<< Updated upstream
=======
import GameLoopManager from './src/GameLoopManager.mjs';
>>>>>>> Stashed changes
import * as THREE from '#three';
import { Level } from './Level.mjs';
import { LEVELS } from './LevelData.mjs';
<<<<<<< Updated upstream
=======
import { ScreenManager } from './src/ScreenManager.mjs';
import { MainMenuScreen } from './screens/MainMenuScreen.mjs';
import { OptionsScreen } from './screens/OptionsScreen.mjs';
import FollowCamera from './src/FollowCamera.mjs';
>>>>>>> Stashed changes

class Main {
    assets;   
    renderer;
    scene;
    camera;

    constructor() {
        this.assets = new AssetsManager();
        this.assets.load( () => {
            this.initScene();
            this.initCamera();
            this.initLight();
            this.initRenderer();
            this.initLevel();
<<<<<<< Updated upstream
            this.gameLoop();            
        });        
=======
            //this.initFollowCamera();
            //this.initPIXI();
            //this.initScreens();
            this.initGameLoop();
        });   
>>>>>>> Stashed changes
    }

    initLevel() {
        let level = new Level( LEVELS[0] );
        app.scene.add( level.model );
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x8FDFFF );
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
<<<<<<< Updated upstream
        this.camera.position.set( -15, 40, 30 );
        this.camera.lookAt( 20, 0, 30 );
        this.scene.add(this.camera);
=======
        this.camera.position.set( 0, 35, 40 );
        this.camera.lookAt( 0, 0, 0 );
    }

    initFollowCamera(){
        let followCamera = new FollowCamera( this.camera, app.level.player.model, new THREE.Vector3( 0, 90, 0 ) );
        this.followCamera = followCamera;
>>>>>>> Stashed changes
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
    
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
            powerPreference: "high-performance"
        });
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        this.renderer.shadowMap.enabled = true;
        document.body.appendChild( this.renderer.domElement );

<<<<<<< Updated upstream
        this.renderer.render( this.scene, this.camera );
=======
    initPIXI() {
        this.pixi = new PIXI.Application({
            backgroundColor: 0x150a0a,
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
            new OptionsScreen()
        ); 

        this.screenManager.set( MainMenuScreen );
        this.pixi.stage.addChild(this.screenManager.display);
        
        gsap.delayedCall(2.0, () => {
            this.screenManager.set( OptionsScreen );
        });
    }

    initGameLoop() {
        this.loop = new GameLoopManager();
        this.loop.add(this.update);
    }

    update = () => {
        this.renderer.render( this.scene, this.camera );        
>>>>>>> Stashed changes
    }

    gameLoop = () => {
        this.renderer.render( this.scene, this.camera );
        requestAnimationFrame( this.gameLoop ); 
    }

}

globalThis.app = new Main();
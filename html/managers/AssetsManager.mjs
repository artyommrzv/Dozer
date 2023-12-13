import { manifest2d, manifest3d } from '../Manifest.mjs';
import { GLTFLoader } from '../libs/GLTFLoader.mjs';

export default class AssetsManager {
    images = {};
    models = {};

    async load( onComplete ) {
        await this.#loadImages( manifest2d );
        await this.#loadModels( manifest3d );
        onComplete();
    }

    #loadImages( manifest ) {
        return new Promise((resolve, reject) => {

            if (manifest === undefined || !Array.isArray(manifest)) {
                console.error('Manifest is incorrect or undefined');
                return;
            }

            if ( manifest.length === 0 ) {
                resolve();
                return;
            }
    
            let currentIndex = 0;
            
            let loadNextImage = () =>  {
                let image = new Image();
                image.onload = imageLoadedHandler;
        
                let imageData = manifest[currentIndex];
                image.src = imageData.src;
                this.images[imageData.name] = image;
            }
        
            let imageLoadedHandler = () => {
                currentIndex ++;
    
                if (currentIndex < manifest.length) {
                    loadNextImage();
                }else {
                    resolve();
                }
            }
            
            loadNextImage();
        });        
    }

    #loadModels( manifest ) {
        return new Promise((resolve, reject) => {
            if (manifest === undefined || !Array.isArray(manifest)) {
                console.error('Manifest is incorrect or undefined');
                return;
            }

            if ( manifest.length === 0 ) {
                resolve();
                return;
            }
    
            let loaderGLTF = new GLTFLoader();
            let currentIndex = 0;
            let modelData = manifest[currentIndex];            
    
            function loadNextModel() {
                loaderGLTF.load(modelData.src, loadCompleteModelHandler);
            }
            
            let loadCompleteModelHandler = (data) => {
                currentIndex ++;
                
                this.models[modelData.name] = data.scene;
                modelData = manifest[currentIndex];
                
                if (currentIndex < manifest.length) {
                    loadNextModel();
                }else {
                    resolve();
                }
            }

            loadNextModel();
        });        
    }
}
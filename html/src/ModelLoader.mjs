export default class ModelLoader {
    models = {};

    load( manifest, callback = function(){} ) {
        if (manifest === undefined || !Array.isArray(manifest) || manifest.length == 0) {
            console.error('Manifest is incorrect or undefined');
            return;
        }

        let loaderGLTF = new THREE.GLTFLoader();
        let currentIndex = 0;
        let modelData = manifest[currentIndex];
        
        loadNextModel();

        function loadNextModel() {
            loaderGLTF.load(modelData.src, loadCompleteModelHandler);
        }
        
        function loadCompleteModelHandler(data) {
            currentIndex ++;
            
            this.models[modelData.name] = data.scene;
            modelData = manifest[currentIndex];
            
            if (currentIndex < manifest.length) {
                loadNextModel();
            }else {
                callback();
            }
        }

    }
}
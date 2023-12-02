class ResizeManager {
    resizeFunctions = new Set();

    constructor({width, height}) {
        this.logicalWidth = width;
        this.logicalHeight = height;

        window.addEventListener('resize', this.windowResizeHandler.bind(this));
        this.windowResizeHandler();  
    }

    windowResizeHandler() {
        app.renderer.resolution = devicePixelRatio;        
        this.resizeFunctions.forEach( resize => resize() );
    }
    
    add( resize ) {        
        this.resizeFunctions.add( resize );
        resize();
    }

    remove( resize ) {        
        this.resizeFunctions.delete( resize );
    }
}
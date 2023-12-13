export default class ResizeManager {
    resizeFunctions = new Set();

    constructor() {
        window.addEventListener('resize', this.windowResizeHandler.bind(this));
        this.windowResizeHandler();
    }

    windowResizeHandler() {        
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
const TILE_SIZE = 7;

class LevelData {
    width;
    height;
    staticTiles;
    objects;

    static GROUND = 1;
    static CABIN = 2;
    static CONTAINER = 3;    
    static PIT = 4;
    static FENCE = 5;
    static PAD = 6;
    static PLANE = 7;
    static EMPTY = 0;

    constructor( width, staticTiles, objects ) {
        this.width = width;
        this.height = Math.floor( staticTiles.length / width )
        this.staticTiles = staticTiles;
        this.objects = objects;
    }

    getIndex( tileX, tileY ) {
        if ( tileX < 0 || tileX >= this.width) return -1;
        if ( tileY < 0 || tileY >= this.width) return -1;
        return tileY * this.width + tileX;
    }

    getTileCode( tileX, tileY ) {
        let index = this.getIndex( tileX, tileY );
        if ( index < 0 || index >= this.staticTiles.length ) return LevelData.EMPTY;
        return this.staticTiles[ index ];
    }

    setTileCode( tileCode, tileX, tileY ) {
        let index = this.getIndex( tileX, tileY );
        if ( index > 0 && index < this.staticTiles.length-1 ) this.staticTiles[ index ] = tileCode;
    }

    getObjectCode( tileX, tileY ) {
        let index = this.getIndex( tileX, tileY );
        return this.objects[ index ];
    }
}

const LEVELS = [
    new LevelData ( 10, [
            5,5,5,5,5,5,5,5,5,5,
            5,1,1,1,1,1,1,1,1,5,
            5,1,2,2,2,1,1,1,1,5,
            5,1,1,1,1,1,1,1,1,5,
            5,1,1,1,1,1,1,6,1,5,
            5,1,1,1,1,1,1,1,1,5,
            5,1,3,1,1,1,1,1,1,5,
            5,1,7,1,1,1,1,1,1,5,
            5,1,1,1,1,1,1,4,4,5,
            5,5,5,5,5,5,5,5,5,5,
        ],
        {
            player: { position: [6, 5] },
            heap: [
                { position: [7, 7] },
                { position: [8, 7] }
            ],
            poddon: [
                { position: [7, 3] }
            ],
        },
    ),     
];

export { TILE_SIZE, LevelData, LEVELS };

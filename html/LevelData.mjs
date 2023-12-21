const TILE_SIZE = 7;

class LevelData {
    width;
    height;
    staticTiles;
    objects;
    isOpened = false;
    levelRanked = 0;

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
        true,

    ),

    new LevelData ( 10, [
            5,5,5,5,5,5,5,5,5,5,
            5,1,1,1,1,1,1,4,1,5,
            5,1,1,1,1,1,1,1,1,5,
            5,5,5,5,5,5,5,5,5,5,
        ],
        {
            player: { position: [2, 2] },
            heap: [
                { position: [6, 1] },
            ],
        },
    
    ),

    new LevelData ( 8, [
            5,5,5,5,5,5,5,5,
            5,1,1,1,1,1,4,5,
            5,1,1,1,1,1,4,5,
            5,1,1,1,1,1,4,5,
            5,5,5,5,5,5,5,5,
        ],
        {
            player: { position: [2, 2] },
            heap: [
                { position: [5, 1] },
                { position: [5, 2] },
                { position: [5, 3] },
            ],
        },
    ),

    new LevelData ( 8, [
            5,5,5,5,5,5,5,5,
            5,1,1,1,1,1,1,5,
            5,1,1,7,7,1,1,5,
            5,1,1,7,7,1,4,5,
            5,1,1,1,1,1,4,5,
            5,5,5,5,5,5,5,5,
        ],
        {
            player: { position: [1, 4] },
            heap: [
                { position: [6, 2] },
                { position: [5, 4] },
            ],
        },
        ),

    new LevelData ( 11, [
            5,5,5,5,5,5,5,5,5,5,5,
            5,1,1,1,1,1,1,1,1,1,5,
            5,1,1,4,7,1,1,1,1,1,5,
            5,1,1,7,7,1,4,1,1,4,5,
            5,1,1,1,1,1,4,4,1,1,5,
            5,5,5,5,5,5,5,5,5,5,5,
        ],
        {
            player: { position: [3, 1] },
            heap: [
                { position: [6, 2] },
                { position: [5, 4] },
                { position: [2, 2] },
                { position: [8, 3] },
                { position: [8, 4] },
            ],
        },
    ),

    new LevelData ( 8, [
            5,5,5,5,5,5,5,5,
            5,1,1,1,1,1,1,5,
            5,7,4,7,1,1,1,5,
            5,1,1,7,1,1,1,5,
            5,1,1,4,7,1,4,5,
            5,1,1,1,4,1,1,5,
            5,1,1,1,7,1,4,5,
            5,5,5,5,5,5,5,5,
        ],
        {
            player: { position: [2, 5] },
            heap: [
                { position: [3, 5] },
                { position: [5, 5] },
                { position: [2, 3] },
                { position: [6, 3] },
                { position: [6, 5] },
            ],
        },
    ),

    new LevelData ( 8, [
            5,5,5,5,5,5,5,5,
            5,1,4,1,1,1,1,5,
            5,1,4,1,1,1,1,5,
            5,1,1,1,3,1,1,5,
            5,1,1,1,1,1,1,5,
            5,1,4,1,1,3,1,5,
            5,1,1,4,1,1,4,5,
            5,5,5,5,5,5,5,5,

        ],
        {
            player: { position: [4, 5] },
            heap: [
                { position: [3, 5] },
                { position: [2, 4] },
                { position: [2, 3] },
                { position: [3, 1] },
                { position: [6, 5] },
            ],
        },
    ),

    new LevelData ( 14, [
            5,5,5,5,5,5,5,5,5,5,5,5,5,5,
            5,1,4,1,1,1,1,1,1,7,1,1,1,5,
            5,4,1,1,1,3,1,1,1,7,1,1,1,5,
            5,1,1,4,1,1,4,4,1,1,4,1,4,5,
            5,5,5,5,5,5,5,5,5,5,5,5,5,5,

        ],
        {
            player: { position: [11, 2] },
            heap: [
                { position: [12, 2] },
                { position: [6, 2] },
                { position: [5, 3] },
                { position: [2, 3] },
                { position: [3, 1] },
                { position: [11, 3] },
                { position: [2, 2] },
            ],
        },
    ),     
];

LEVELS[0].isOpened = true;
export { TILE_SIZE, LevelData, LEVELS };

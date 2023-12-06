const TILE_SIZE = 7;

class LevelData {
    width;
    height;
    staticTiles;
    objects;

    static GROUND = 0;
    static CONTBLUE = 1;
    static CONTGREY = 2;
    static PIT = 4;
    static FENCE = 5;

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

    getObjectCode( tileX, tileY ) {
        let index = this.getIndex( tileX, tileY );
        return this.objects[ index ];
    }
}

const LEVELS = [
    new LevelData ( 10, [
            2,5,5,5,5,5,5,5,5,2,
            2,0,0,0,0,0,0,0,0,2,
            2,0,0,0,0,0,0,0,0,2,
            2,0,0,0,0,0,0,0,0,2,
            2,0,0,0,1,1,0,0,0,2,
            2,0,0,0,1,1,0,0,0,2,
            2,0,0,0,0,0,0,0,0,2,
            2,0,0,0,0,0,0,0,0,2,
            2,0,0,0,0,0,0,4,4,2,    
            2,5,5,5,5,5,5,5,5,2,
        ],
        {
            player: { position: [4, 2] },
            heap: [
                { position: [7, 7] },
                { position: [8, 7] }
            ],
        },
        {
            state: 'opened',
        }
       
    ), 

    new LevelData ( 10, [
            5,5,5,5,5,5,5,5,5,5,
            5,1,1,1,1,1,1,1,1,5,
            5,1,2,2,2,1,1,1,1,5,
            5,1,1,1,5,5,5,6,6,5,
            5,1,1,1,5,5,5,1,6,5,
            5,1,1,1,1,1,1,1,1,5,
            5,1,3,1,1,1,1,1,1,5,
        ],
        {
            player: { position: [6, 5] },
            heap: [
                { position: [7, 7] },
                { position: [8, 7] }
            ],
        },
        {
            state: 'blocked',
        }
    ),     
];

export { TILE_SIZE, LevelData, LEVELS };

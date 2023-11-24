const TILE_SIZE = 7;

class LevelData {
    width;
    height;
    staticTiles;
    objects;

    static FLOOR = 0;
    static WALL = 1;
    static BOX = 2;
    static BOX_PLACED = 3;
    static PLACE = 4;

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
            1,1,1,1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,1,
            1,0,0,0,1,1,0,0,0,1,
            1,0,0,0,1,1,0,0,0,1,
            1,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,2,2,1,
            1,0,0,0,0,0,0,4,4,1,    
            1,1,1,1,1,1,1,1,1,1, 
        ],
        {
            player: { position: [4, 2] },
        },
    ),     
];

export {  TILE_SIZE, LevelData, LEVELS };

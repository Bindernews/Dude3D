
var BD = BD || {};

/**
 * Construct a Level object. This object is a representation of the level
 
 * @param {LevelData} data - data object specifying the level
 */
BD.Level = function(data) {
    this.data_ = data;
    this.blocks_ = data.blocks;
};

/**
 * Get a block at a location
 * 
 * @param {number} x - location of block on x-axis
 * @param {number} y - location of block on y-axis
 * @param {number} z - location of block on vertical axis
 */
BD.Level.prototype.getBlock = function(x, y, z) {
//    return this.blocks_[x][y][z] || -1;
    if(z === 0) {
        return BD.Blocks.NORMAL;
    } else {
        return BD.Blocks.NONE;
    }
};

/**
 * Change the block at a location specified by a set of x,y,z coordinates.
 *
 * @param {number} x - location of block on x-axis
 * @param {number} y - location of block on y-axis
 * @param {number} z - location of block on vertical axis
 * @param {number} block - new block id for the location
 */
BD.Level.prototype.setBlock = function(x, y, z, block) {
    this.blocks_[x][y][z] = block; 
};

BD.Level.prototype.getLength = function() {
    return this.data_.length;
};

BD.Level.prototype.getWidth = function() {
    return this.data_.width;
};

BD.Level.prototype.getHeight = function() {
    return this.data_.height;
};


var BD = BD || {};

// constants
/**
 * The semi-arbitrary size of one movement block in WebGL coordinates
 */
BD.BLOCK_SIZE = 1;


/**
 * Standard time between key repeats
 */
BD.KEY_REPEAT_TIME = 100;


/** Standard time for animations */
BD.TWEEN_TIME = 200;


/**
 * Constants for the different type of blocks found in the game
 */
BD.Blocks = {
    NONE: 0,
    NORMAL: 1,
    ROCK: 2,
    BOMB: 3,
};


/**
 * BD.Math containts useful math functions
 */
BD.Math = BD.Math || {

    
    /**
     * Calculate the x and y delta values from a direction and a length.
     *
     * @param {number} direction - Direction in radians
     * @param {number} length - length in arbitrary units
     * @returns An object with x and y properties corresponding to the x and y
     *          offset values.
     */
    deltaXY: function(direction, length) {
        return {
            x: length * Math.cos(direction),
            y: length * Math.sin(direction),
        };
    },
    
    
    /**
     * Round a number out to a certain number of digits
     */
    round: function(value, digits) {
        var multiplier = Math.pow(10, digits);
        return Math.round(value * multiplier) / multiplier;
    },
};



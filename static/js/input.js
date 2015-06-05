
/**
 * Handles keyboard input.
 */
var Input = {
    /** Keeps track of keys which are currently held down */
    pressed_: {},
    released_: {},
    
    
    /** Key code constants */
    Key: {
        W: 87,
        A: 65,
        S: 83,
        D: 68,
        E: 69,
        LEFT:  37,
        UP:    38,
        RIGHT: 39,
        DOWN:  40,
    },

    
    /**
     * Check if a key is currently down.
     * 
     * @param {number} code - the key code of the key to check
     * @return {boolean} True if the key is currently down false otherwise
     */
    isDown: function( code ) {
        return this.pressed_[code];
    },
    
    
    /**
     * Check if the key has been pressed since the last frame.
     *
     * @param {number} code - the key code of the key to check
     * @return {boolean} True if the key was pressed since the previous frame
     */
    isPressed: function( code ) {
        return this.pressed_[code] == 2;
    },
    
    
    /**
     * Check if the key has been released since the last frame.
     *
     * @param {number} code - the key code of the key to check
     * @return {boolean} True if the key was released since the previous frame
     */
    isReleased: function( code ) {
        return this.released_[code];
    },
    
    
    /**
     * Event handler for the onkeydown event
     */
    onKeydown: function( event ) {
        this.pressed_[event.keyCode] = this.pressed_[event.keyCode] || 2;
    },
    
    
    /** 
     * Event handler for the onkeyup event
     */
    onKeyup: function( event ) {
        delete this.pressed_[event.keyCode];
        this.released_[event.keyCode] = true;
    },
    
    
    /**
     * Called each frame to to allow the Keyboard system to update itself.
     */
    update: function( time ) {
        Object.keys( this.pressed_ ).forEach(function( k ) {
            if( this.pressed_[k] == 2 ) {
                this.pressed_[k] = 1;
            }
        });
        this.released_.clear();
    }
};

window.addEventListener( "keydown", function(event) { Input.onKeydown(event); }, false );
window.addEventListener( "keyup", function(event) { Input.onKeyup(event); }, false );

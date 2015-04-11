
function Player( scene ) {
    this.scene = scene;
    this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
    this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    this.cube = new THREE.Mesh( this.geometry, this.material );
    this.state = "normal"
    scene.add( this.cube );
}

Player.prototype.update = function( gameTime ) {
    if ( this.state === "normal" ) {
        // only allow keyboard input if the player's state is normal
        // otherwise they might be in an animation or something and we
        // don't want to interrupt that.
        
        // here we move the player based on the camera's angle
        var cameraDirection = PI * 3 / 2;
        var moveDirection = false;
        if ( Key.isDown( Key.W ) ) {
            moveDirection = PI;
        }
        if ( Key.isDown( Key.A ) ) {
            moveDirection = PI * 3 / 2;
        }
        if ( Key.isDown( Key.S ) ) {
            moveDirection = 0;
        }
        if ( Key.isDown( Key.D ) ) {
            moveDirection = PI / 2;
        }
        if ( moveDirection ) {
            var dx = Math.cos( cameraDirection + moveDirection );
            var dy = Math.sin( cameraDirection + moveDirection );
            this.move( dx, dy );
        }
        else {
            // don't allow pickup/place and movement in the same frame
            if ( Key.isDown( Key.E ) ) {
            }
        }

        // update the player model's position
        this.cube.position.set( this.x, this.y this.z );
    }
};

/**
 * Move the player by dx and dy. Handles stepping up if necessary.
 * 
 * @param {number} dx - delta x by which to try to move the player
 * @param {number} dy - delta y by which to try to move the player
 * @return true if movement was successfull false otherwise
 */
Player.prototype.move = function( dx, dy ) {
    // placeholder code to move the player
    var newX = this.x + dx,
        newY = this.y + dy;
    if ( Game.model.get( newX, newY, this.z ) == 0 ) {
        // move in desired direction
        return true;
    }
    else if ( Game.model.get( newX, newY, this.z + 1 ) == 0 ) {
        // move and step up 1
        return true;
    }
    else {
        return false;
    }
};
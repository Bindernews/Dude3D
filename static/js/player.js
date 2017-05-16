
var BD = BD || {};

(function(){

    BD.Player = function() {
        var scene = BD.Game.scene;
        
        /** State of the player */
        this.state = "normal"
        /** Direction the player is facing on the z axis */
        this.direction = 0;
        /** What is the player currently carrying? */
        this.carrying_ = null;
        
        this.geometry = new THREE.BoxGeometry( 0.9, 0.9, 1 );
        this.model = new THREE.Mesh( this.geometry, new THREE.MeshBasicMaterial(
            {color: 0xff0000, wireframe: false}) );
        var modelWireframe = new THREE.Mesh( this.geometry, new THREE.MeshBasicMaterial(
            {color: 0xffffff, wireframe: true}) );
        this.model.add(modelWireframe);
        scene.add( this.model );
        
        this.teleport(0, 0, 1);
        
        BD.data.player = {
            pos: this.model.position,
            state: this.state,
        };
    };


    BD.Player.prototype = {
        constructor: BD.Player,

        
        destroy: function() {
            var scene = BD.Game.scene;
            scene.remove(this.model);
        },
        

        update: function( delta ) {
            if( this.state === "normal" ) {
                // only allow keyboard input if the player's state is normal
                // otherwise they might be in an animation or something and we
                // don't want to interrupt that.

                // here we move the player based on the camera's angle
                var cameraDirection = BD.Game.cameraController.direction;
                var moveDirection = false;
                var Control = BD.Control;
                
                if(Control.C_UP.isDown()) {
                    moveDirection = Math.PI;
                }
                if(Control.C_LEFT.isDown()) {
                    moveDirection = Math.PI * 3 / 2;
                }
                if(Control.C_DOWN.isDown()) {
                    moveDirection = 0;
                }
                if(Control.C_RIGHT.isDown()) {
                    moveDirection = Math.PI / 2;
                }

                if(moveDirection !== false) {
                    this.direction = cameraDirection + moveDirection;
                    var dx = Math.cos( this.direction );
                    var dy = Math.sin( this.direction );
                    this.move( dx, dy );
                } else if(Control.C_ACTION.isDown()) {
                    // don't allow pickup/place and movement in the same frame
                    if(this.carrying_ === null) {
                        this.pickUp( this.direction );
                    } else {
                        this.putDown( this.direction );
                    }
                }
            }
            BD.data.player.state = this.state;
        },
        
        
        /**
         * Move the player by dx and dy. Handles stepping up if necessary.
         * 
         * @param {number} dx - delta x by which to try to move the player
         * @param {number} dy - delta y by which to try to move the player
         * @return true if movement was successful false otherwise
         */
        move: function( dx, dy ) {
            // placeholder code to move the player
            var newX = this.x + dx,
                newY = this.y + dy,
                model = BD.Game.model;
            if ( model.getBlock( newX, newY, this.z ) == BD.Blocks.NONE ) {
                // find out how far we are falling, if at all
                var fallDistance = 0;
                while ( model.getBlock( newX, newY, this.z - fallDistance - 1 ) == BD.Blocks.NONE ) {
                    fallDistance += 1;
                }

                // create animation
                var source = this.model.position,
                    target = {
                        x: Math.round(source.x + (dx * BD.BLOCK_SIZE)),
                        y: Math.round(source.y + (dy * BD.BLOCK_SIZE))
                    },
                    targetZ = {z: source.z - (fallDistance * BD.BLOCK_SIZE)},
                    anim = new TWEEN.Tween(source).to(target, BD.TWEEN_TIME * 0.75);
                anim.easing(TWEEN.Easing.Quadratic.Out);
                if (fallDistance > 0) {
                    anim.chain(new TWEEN.Tween(source).to(targetZ, BD.TWEEN_TIME).onComplete(
                        this.endAnimation_()));
                } else {
                    anim.onComplete(this.endAnimation_());
                }
                this.animate( anim );
                anim.start();
                this.x = newX;
                this.y = newY;
                return true;
            } else if ( model.getBlock( newX, newY, this.z + 1 ) == BD.Blocks.NONE ) {
                // move and step up 1
        //        var anim = null;
        //        this.animate( anim );
                return true;
            } else {
                return false;
            }
        },
        
        
        /**
         * Teleport the player to the given block coordinates.
         * @param {number} x - location on x-axis
         * @param {number} y - location on y-axis
         * @param {number} z - location on z-axis
         */
        teleport: function( x, y, z ) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.model.position.set(x * BD.BLOCK_SIZE,
                                    y * BD.BLOCK_SIZE,
                                    z * BD.BLOCK_SIZE);
        },
        
        
        animate: function( animation ) {
            this.state = "animation";
            this.animation = animation;
        },
        
        
        endAnimation_: function() {
            var self = this;
            return function() {
                self.state = 'normal';
                self.animation = null;
            };
        },
        
        
        /** NYI - API not set
         * Pick up whatever is in front of the player in the given direction.
         *
         * @param {number} direction - direction to pick up an object from
         * @return true if an object was picked up false otherwise
         */
        pickUp: function( direction ) {
        },

        
        /** NYI - API not set
         * Put down whatever the player is currently carrying.
         */
        putDown: function( direction ) {
        },
    };
})();

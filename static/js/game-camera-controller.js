
var BD = BD || {};

(function(){

    var Key = Input.Key;
    var Control = BD.Control

    /**
     * Construct a new GameCameraController object
     */
    BD.GameCameraController = function(camera, following) {
        /** The direction the camera is set to face. Changes are immediate. */
        this.direction = 0;
        /** The direction the camera is actually facing. This differs from direction
         * because viewDirection changes during animations. */
        this.viewDirection = 0;
        /** Distance to keep from the player in WebGL units */
        this.distance = 5;
        /** Distance to stay above the player (z-axis) in WebGL units */
        this.upDistance = 4;
        
        this.state = "normal";
        
        /** A reference to the camera we're updating */
        this.camera_ = camera;
        
        /** A reference to the object we are following */
        this.following_ = following;
        
        this.keyRepeat_ = {
            Control.C_CAM_LEFT: 0,
            Control.C_CAM_RIGHT: 0,
        };
    };

    BD.GameCameraController.prototype = {
        constructor: BD.GameCameraController,
        
        /**
         * Update the GameCameraController. Should be called once per frame.
         *
         * @param {number} delta - The number of milliseconds between now and the
         *        previous frame.
         */
        update: function(delta) {
            this.keyUpdate(Control.C_CAM_LEFT);
            this.keyUpdate(Control.C_CAM_RIGHT);

            if (this.state == "normal") {
                if (Control.C_CAM_LEFT.isDown()
                    && this.keyRepeat_[Control.C_CAM_LEFT] == 0) {
                    this.setDirection(this.viewDirection - (Math.PI / 2));
                }    
                if (Control.C_CAM_RIGHT.isDown()
                    && this.keyRepeat_[Control.C_CAM_RIGHT] == 0) {
                    this.setDirection(this.viewDirection + (Math.PI / 2));
                }
            }
            
            var basePosition = this.following_.position,
                cx = basePosition.x + (this.distance * Math.cos(this.viewDirection)),
                cy = basePosition.y + (this.distance * Math.sin(this.viewDirection)),
                cz = basePosition.z + this.upDistance;
            this.camera_.position.set(cx, cy, cz);
            this.camera_.lookAt(basePosition);
        },
        
        /**
         * Reset the camera to it's initial state.
         */
        reset: function() {
            this.direction = 0;
            this.viewDirection = 0;
            this.keyRepeat_[Key.LEFT] = 0;
            this.keyRepeat_[Key.RIGHT] = 0;
            this.state = "normal";
        },

        /**
         * Change the direction of the camera via the camera controller. This will
         * start an animation so the player sees the camera angle changing.
         *
         * @param {number} direction - The camera's new direction
         */
        setDirection: function(direction) {
            this.direction = direction;
            var target = {viewDirection: direction},
                anim = new TWEEN.Tween(this).to(target, BD.TWEEN_TIME);
            anim.easing(TWEEN.Easing.Cubic.InOut);
            this.animate(anim);
        },
        
        animate: function(animation) {
            this.state = "animation";
            this.animation = animation;
            animation.onComplete(function() {
                this.state = "normal";
                this.animation = null;
            });
            animation.start();
        },
        
        keyUpdate: function(control) {
            if (control.isDown()) {
                this.keyRepeat_[control] = Math.max(this.keyRepeat_[control] - 1, 0);
            } else {
                this.keyRepeat_[control] = 0;
            }
        },
    };
})();

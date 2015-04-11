
/* The constant Pi */
var PI = 3.14159265,
    PI_2 = PI * 2;

/**
 * Handles keyboard input.
 */
var Key = {
    /** Keeps track of keys which are currently held down */
    _pressed: {},

    /**
     * Check if a key is currently down.
     * 
     * @param {number} code - the key code of the key to check
     * @return {boolean} True if the key is currently down false otherwise
     */
    isDown: function( code ) {
        return this._pressed[code];
    },
    
    /**
     * Event handler for the onkeydown event
     */
    onKeydown: function( event ) {
        this._pressed[event.keyCode] = true;
    },
    
    /** 
     * Event handler for the onkeyup event
     */
    onKeyup: function( event ) {
        delete this._pressed[event.keyCode];
    },
};

/**
 * Holds keycodes for various keys used in the game
 */
var KCODE = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    LEFT:  37,
    UP:    38,
    RIGHT: 39,
    DOWN:  40,
};


function Player( scene ) {
    this.scene = scene;
    this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
    this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    this.cube = new THREE.Mesh( this.geometry, this.material );
    scene.add( this.cube );
}

Player.prototype.update = function( gameTime ) {
    
}

Game = {
    
};

function runGame() {
    /* Step 1 is to assume three.js has been loaded becase if not there isn't
     * really much we can do. */
    
    var sceneWidth = window.innerWidth - 4,
        sceneHeight = window.innerHeight - 4;
    
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, sceneWidth / sceneHeight, 0.1, 200 );
    camera.up.set( 0, 0, 1 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( sceneWidth, sceneHeight );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 2, 2, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 4;
    camera.angleZ = 0;
    
    var camera_distance = 3;
    var origin = new THREE.Vector3( 0, 0, 0 );
    
    function update( gameTime ) {
//        cube.rotation.x += 0.1;
//        cube.rotation.y += 0.1;
        
        var angleZ = camera.angleZ;
        if ( Key.isDown( KCODE.LEFT ) ) {
            angleZ -= 0.1;
        }
        if ( Key.isDown( KCODE.RIGHT ) ) {
            angleZ += 0.1;
        }
        if ( angleZ < 0 ) {
            angleZ += PI_2;
        }
        if ( angleZ > PI_2 ) {
            angleZ -= PI_2;
        }
//        console.log( angleZ );
        camera.position.x = camera_distance * Math.cos( angleZ );
        camera.position.y = camera_distance * Math.sin( angleZ );
        camera.lookAt( origin );
        camera.angleZ = angleZ;
    }

    function render() {
        requestAnimationFrame( render );
        update();
        renderer.render( scene, camera );
    }
    
    window.addEventListener( "keydown", function(event) { Key.onKeydown(event); }, false );
    window.addEventListener( "keyup", function(event) { Key.onKeyup(event); }, false );
    
    render();
}

window.addEventListener( "load", function() {
    runGame();
}, true );



/* The constant Pi */
var PI = 3.14159265,
    PI_2 = PI * 2;

/**
 * Holds keycodes for various keys used in the game
 */
var KCODE = {
    
};

/**
 * Handles keyboard input.
 */
var Key = {
    /** Keeps track of keys which are currently held down */
    _pressed: {},
    
    /** Constants */
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    E: 69,
    LEFT:  37,
    UP:    38,
    RIGHT: 39,
    DOWN:  40,

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

function runGame() {
    /* Step 1 is to assume three.js has been loaded becase if not there isn't
     * really much we can do. */
    
    
    var sceneWidth = window.innerWidth,
        sceneHeight = window.innerHeight;
    
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, sceneWidth / sceneHeight, 0.1, 200 );
    camera.up.set( 0, 0, 1 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( sceneWidth, sceneHeight );
    document.body.appendChild( renderer.domElement );

    
    var material = undefined,
        geometry = undefined;
    
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    geometry = new THREE.BoxGeometry( 2, 2, 1 );
    var box1 = new THREE.Mesh( geometry, material );
    scene.add( box1 );
    
    material = new THREE.MeshBasicMaterial({ color: 0x00ffff })
    geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var box2 = new THREE.Mesh( geometry, material );
    box2.position.x = 2;
    scene.add( box2 );

    camera.position.z = 4;
    camera.angleZ = 0;
    
    var camera_distance = 3;
    var origin = new THREE.Vector3( 0, 0, 0 );
    
    function update( gameTime ) {
        // update the camera angle
        var angleZ = camera.angleZ;
        if ( Key.isDown( Key.LEFT ) ) {
            angleZ -= 0.1;
        }
        if ( Key.isDown( Key.RIGHT ) ) {
            angleZ += 0.1;
        }
        if ( angleZ < 0 ) {
            angleZ += PI_2;
        }
        if ( angleZ > PI_2 ) {
            angleZ -= PI_2;
        }
        camera.position.x = camera_distance * Math.cos( angleZ );
        camera.position.y = camera_distance * Math.sin( angleZ );
        camera.lookAt( origin );
        camera.angleZ = angleZ;
        
        // spin the box(es)
        box2.rotation.z += 0.05;
    }

    function render( time ) {
        requestAnimationFrame( render );
        update( time );
        renderer.render( scene, camera );
    }
    requestAnimationFrame( render );
}

window.addEventListener( "load", function() {
    runGame();
}, true );

window.addEventListener( "keydown", function(event) { Key.onKeydown(event); }, false );
window.addEventListener( "keyup", function(event) { Key.onKeyup(event); }, false );


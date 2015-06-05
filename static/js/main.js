
/* The constant Pi */
var PI = 3.14159265,
    PI_2 = PI * 2;

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

    camera.angleZ = 0;
    camera.angleY = PI / 3;
    
    var camera_distance = 3;
    var origin = new THREE.Vector3( 0, 0, 0 );
    
    var loopBounds = function( val, min, max ) {
        var delta = max - min;
        if ( val < min ) {
            return val + delta;
        }
        if ( val > max ) {
            return val - delta;
        }
        return val;
    };
    
    var sign = function( val ) {
        if ( val > 0 ) {
            return 1;
        }
        if ( val < 0 ) {
            return -1;
        }
        return 0;
    };
    
    function update( gameTime ) {
        // update the camera angle
        var angleZ = camera.angleZ,
            angleY = camera.angleY,
            angleSpeed = 0.1;
        if ( Key.isDown( Key.LEFT ) ) {
            angleZ -= angleSpeed;
        }
        if ( Key.isDown( Key.RIGHT ) ) {
            angleZ += angleSpeed;
        }
        if ( Key.isDown( Key.UP ) ) {
            angleY += angleSpeed;
        }
        if ( Key.isDown( Key.DOWN ) ) {
            angleY -= angleSpeed;
        }
        angleZ = loopBounds( angleZ, 0, PI_2 );
        angleY = loopBounds( angleY, 0, PI_2 );
        
        camera.position.x = camera_distance * sign(Math.cos( angleZ )) * Math.cos( angleY );
        camera.position.y = camera_distance * Math.sin( angleZ );
        camera.position.z = camera_distance * Math.sin( angleY );
        camera.lookAt( origin );
        camera.angleZ = angleZ;
        camera.angleY = angleY;
        
        // spin the box(es)
        box2.rotation.z += 0.05;
    }

    function render( time ) {
        requestAnimationFrame( render );
        TWEEN.update( time );
        update( time );
        renderer.render( scene, camera );
    }
    requestAnimationFrame( render );
}

window.addEventListener( "load", function() {
    runGame();
}, true );



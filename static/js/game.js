
var BD = BD || {}
BD.data = BD.data || {};

BD.Game = {
    player: null,
    cameraController: null,
    previousTime: 0,
    
    /**
     * Initialize the game state. Should be called only after the entire page
     * has loaded.
     */
    initialize: function() {
        var sceneWidth = window.innerWidth,
            sceneHeight = window.innerHeight - 20;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, sceneWidth / sceneHeight, 0.1, 200 );
        this.camera.up.set( 0, 0, 1 );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( sceneWidth, sceneHeight );
        document.getElementById("viewport").appendChild( this.renderer.domElement );
        
        this.setViewportSize(sceneWidth, sceneHeight);
        
        // temp code for testing
        this.player = new BD.Player();
        this.cameraController = new BD.GameCameraController(this.camera, this.player.model);
        this.dataDisplay = document.getElementById("data");
        this.model = new BD.Level({
            width: 10,
            length: 10,
            height: 10,
        });
        
        var self = this;
        (function() {
            var geometry = new THREE.BoxGeometry( 10, 10, 1 );
            var material = new THREE.MeshBasicMaterial({ color: 0x00a0ef, wireframe: false });
            var mesh = new THREE.Mesh(geometry, material);
            self.scene.add(mesh);
        })();
    },
    
    /**
     * Set the viewport size. Should not be called before initialize().
     *
     * @param {number} width - the new width of the canvas
     * @param {number} height - new height of the view canvas
     */
    setViewportSize: function(width, height) {
        var elem = document.getElementById('viewport');
        elem.style.width = width;
        elem.style.height = height;
        this.camera.aspect = width / height;
        this.renderer.setSize(width, height);
    },
    
    
    /**
     * Main game run function. Should be called after initialize() and after
     * the entire page has loaded.
     */
    run: function() {
        var self = this;
        var updateF = (function(time) {
            TWEEN.update(time);
            self.update(time);
            self.renderer.render( self.scene, self.camera );
            requestAnimationFrame(updateF);
        });
        this.previousTime = Date.now()
        requestAnimationFrame(updateF);
    },
    
    
    /**
     * Update function called each frame. Unfortunately the game is currently
     * limited by framerate which is not optimal but it's easy and because
     * this is not a multiplayer game it doesn't matter very much.
     */
    update: function(time) {
        var delta = time - this.previousTime;
        this.previousTime = time;
        this.player.update(delta);
        this.cameraController.update(delta);
        this.dataDisplay.innerHTML = JSON.stringify(BD.data);
    },
};


window.addEventListener('load', function() {
    BD.Game.initialize();
    BD.Game.run();
}, true);

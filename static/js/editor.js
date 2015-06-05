
var BD = BD || {}
BD.data = BD.data || {};

BD.Editor = {
    player: null,
    cameraController: null,
    previousTime: 0,
    
    initialize: function() {
        var sceneWidth = window.innerWidth,
            sceneHeight = window.innerHeight - 20;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, sceneWidth / sceneHeight, 0.1, 200 );
        this.camera.up.set( 0, 0, 1 );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( sceneWidth, sceneHeight );
        document.getElementById("viewport").appendChild( this.renderer.domElement );
        
        // temp code for testing
        this.cameraController = new BD.CameraController();
        this.player = new BD.Player();
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
    
    loadLevel: function(name) {
    },
    
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
    
    update: function(time) {
        var delta = time - this.previousTime;
        this.previousTime = time;
        this.player.update(delta);
        this.cameraController.update(delta);
        this.dataDisplay.innerHTML = JSON.stringify(BD.data);
    },
};

window.addEventListener('load', function() {
    BD.Editor.initialize();
    BD.Editor.run();
}, true);


function Game() {
    this.model = undefined;
    this.player = undefined;
}

Game.prototype.initialize = function() {
    var sceneWidth = window.innerWidth - 4,
        sceneHeight = window.innerHeight - 4;
    
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, sceneWidth / sceneHeight, 0.1, 200 );
    this.camera.up.set( 0, 0, 1 );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( sceneWidth, sceneHeight );
    document.body.appendChild( this.renderer.domElement );
};

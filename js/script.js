//CREAMOS EL MUNDO PHASER
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'Juego-Colisiones', {preload: preload, create: create, update: update, render: render});

function preload() {
    game.load.image('logo', 'assets/sprites/logo.png');
    game.load.image('estrella', 'assets/sprites/star.png');
    game.load.audio('blud', ['assets/sound/blud.mp3', 'assets/sound/blud.ogg']);
    game.load.image('personaje','assets/sprites/baddie.png');
}

var milogo;
var miestrella;
var miblud;
var micolordefondo;
var counter = 0;
var mipersonaje;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    agregarGraficaDecorativa();

    mipersonaje = game.add.sprite(game.world.centerX,innerHeight - 30,'personaje');
    game.physics.arcade.enable(mipersonaje);
    mipersonaje.body.collideWorldBounds = true;
    //mipersonaje.body.velocity.x = 0;
    //mipersonaje.body.velocity.y = 0;
   // mipersonaje.body.bounce.set(0.0);
    mipersonaje.inputEnabled = true;
    mipersonaje.input.enableDrag();




    miestrella = game.add.sprite(0, 0, 'estrella');
    game.physics.enable(miestrella, Phaser.Physics.ARCADE);
    miestrella.body.velocity.setTo(200, 200);
    miestrella.body.collideWorldBounds = true;
    miestrella.body.bounce.set(0.8);
    miestrella.body.gravity.set(0, 190);

    miblud = game.add.audio('blud', 1, true);

    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
}

function render() {

}
function update() {

    var alto = innerHeight;
    game.physics.arcade.collide(miestrella,milogo, collisionHandler, null, this);

    if(game.physics.arcade.collide(miestrella, mipersonaje)){
        miestrella.destroy();
        console.log('destruido cuando colisiono con personaje');
    }

    if(miestrella.y > alto-40){
        miestrella.destroy();
        console.log('destruido cuando colisiono con el contenedor');
    }

    mipersonaje.y = innerHeight -30;


}
function agregarGraficaDecorativa() {
    milogo = game.add.sprite(game.world.centerX, 0, 'logo');
    milogo.anchor.set(0.5, 0);
    game.physics.enable(milogo, Phaser.Physics.ARCADE);

    milogo.body.immovable = true;
}
function collisionHandler(obj1, obj2) {
    micolordefondo='#'+Math.floor(Math.random()*16777215).toString(16);
    console.log(micolordefondo);
    game.stage.backgroundColor = micolordefondo;
    miblud.play('', 0, 1, false);
}
function updateCounter() {
    counter++;

    var posicionEstrella = Math.floor(Math.random() * (innerWidth - 10 + 1)) + innerWidth;
    console.log(posicionEstrella);
    console.log(counter);

    if(counter == 5){

        miestrella = game.add.sprite(posicionEstrella, 0, 'estrella');
        game.physics.enable(miestrella, Phaser.Physics.ARCADE);
        miestrella.body.velocity.setTo(200, 200);
        miestrella.body.collideWorldBounds = true;
        miestrella.body.bounce.set(0.8);
        miestrella.body.gravity.set(0, 190);
        counter = 0;

    }
}

/**
 * Created by Luis Rodriguez - luiswr@hotmail.com on 21/06/14.
 */

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'Primer Juego', {preload: preload, create: create, render: render, update: update});

var milogo;
var miestrella;
var midiamante;
var miblud;
var micolordefondo;
var counter = 0;
var mipersonaje;

function preload() {
    game.load.image('logo', 'assets/sprites/logo.png');
    game.load.image('estrella', 'assets/sprites/star.png');
    game.load.image('diamante', 'assets/sprites/diamond.png');
    game.load.image('personaje', 'assets/sprites/baddie.png');
    game.load.audio('blud', ['assets/sound/blud.mp3', 'assets/sound/blud.ogg']);
}

function create() {

    /**Creamos al personaje**/
    game.physics.startSystem(Phaser.Physics.ARCADE);
    mipersonaje = game.add.sprite(game.world.centerX, innerHeight - 30, 'personaje');
    game.physics.arcade.enable(mipersonaje);
    mipersonaje.body.bounce.set(0.0);
    mipersonaje.body.gravity.set(0, 0);
    mipersonaje.body.collideWorldBounds = true;
    mipersonaje.inputEnabled = true;
    mipersonaje.input.enableDrag();

    /**Creamos a la estrella**/
    miestrella = game.add.sprite(0, 0, 'estrella');
    game.physics.enable(miestrella, Phaser.Physics.ARCADE);
    miestrella.body.velocity.setTo(150, 150);
    miestrella.body.collideWorldBounds = true;
    miestrella.body.bounce.set(0.9);

    /**Creamos el diamante**/
    midiamante = game.add.sprite(0, 0, 'diamante');
    game.physics.enable(midiamante, Phaser.Physics.ARCADE);
    midiamante.body.velocity.setTo(200, 200);
    midiamante.body.collideWorldBounds = true;
    midiamante.body.bounce.set(0.9);

    /*Creamos el logo*/
    milogo = game.add.sprite(game.world.centerX, 0, 'logo');
    milogo.anchor.set(0.5, 0);
    game.physics.enable(milogo, Phaser.Physics.ARCADE);
    milogo.body.immovable = true;

    /**Seteamos el audio**/
    miblud = game.add.audio('blud', 1, true);

    //**Iniciamos el tiempo que creará nuevas estrellas y diamantes**//
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
}

function render() {

}


function update() {
    detectarColision();
    forzarPosicionPersonaje();
    verificarColisionWorld();
}


function detectarColision() {
    game.physics.arcade.collide(miestrella, mipersonaje, colisionoEstrella, null, this);
    game.physics.arcade.collide(midiamante, mipersonaje, colisionoDiamante, null, this);

}

function colisionoEstrella(obj1, obj2) {

    miestrella.destroy();
    ejecutarAudio(1);
    cambiarColor(1);

}

function colisionoDiamante() {
    midiamante.destroy();
    ejecutarAudio(2);
    cambiarColor(2);
}

function forzarPosicionPersonaje() {
    mipersonaje.y = innerHeight - 30;
}

function ejecutarAudio(audio) {
    switch (audio) {
        case 1:
            miblud.play('', 0, 1, false);
            break;
        case 2:
            console.log('segundo Audio');
            break;
    }
}

function cambiarColor(number) {

    micolordefondo = '#' + Math.floor(Math.random() * 16777215).toString(16);

    switch (number) {
        case 1:
            game.stage.backgroundColor = micolordefondo;
            break;
        case 2:
            game.stage.backgroundColor = '#ff0000';
            break;
    }
}

function updateCounter() {
    counter++;


    var posicionEstrella = Math.floor(Math.random() * (innerWidth - 0 + 1)) + 0;
    console.log(posicionEstrella);

    if (counter == 5) {


            console.log('agregamos estrella');
            miestrella = game.add.sprite(posicionEstrella, 0, 'estrella');
            game.physics.enable(miestrella, Phaser.Physics.ARCADE);
            miestrella.body.velocity.setTo(0, 0);
            miestrella.body.collideWorldBounds = true;
            miestrella.body.bounce.set(0.8);
            miestrella.body.gravity.set(0, 190);

    }

    if (counter == 5) {
        console.log('agregamos diamante');
        midiamante = game.add.sprite(posicionEstrella, 0, 'diamante');
        game.physics.enable(midiamante, Phaser.Physics.ARCADE);
        midiamante.body.velocity.setTo(200, 200);
        midiamante.body.collideWorldBounds = true;
        midiamante.body.bounce.set(0.8);
        midiamante.body.gravity.set(0, 190);
        counter = 0;


    }
}

function verificarColisionWorld() {
    var alto = innerHeight;
    if (miestrella.y > alto - 40) {
        miestrella.destroy();
    }
    if (midiamante.y > alto - 40) {
        midiamante.destroy();
    }
}
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
var miplam;
var vidas = 20;
var contadorPuntaje = 100;
var max = 0;
var front_emitter;
var mid_emitter;
var back_emitter;
var update_interval = 4 * 60;
var i = 0;


function preload() {
    game.load.image('logo', 'assets/sprites/logo.png');
    game.load.image('estrella', 'assets/sprites/star.png');
    game.load.image('diamante', 'assets/sprites/diamond.png');
    game.load.image('personaje', 'assets/sprites/baddie.png');
    game.load.spritesheet('snowflakes_large', 'assets/sprites/snowflakes_large.png', 64, 64);
    game.load.spritesheet('snowflakes', 'assets/sprites/snowflakes.png', 17, 17);
    game.load.image('sky', 'assets/sprites/sky3.png');
    game.load.audio('blud', ['assets/sound/blud.mp3', 'assets/sound/blud.ogg']);
    game.load.audio('plam', ['assets/sound/64119_atari66_beeps.mp3', 'assets/sound/64119__atari66__beeps.ogg']);
}


function create() {



    /**Creamos la nieve**/

    game.add.image(0, 0, 'sky');

    back_emitter = game.add.emitter(game.world.centerX, -32, 600);
    back_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
    back_emitter.maxParticleScale = 0.6;
    back_emitter.minParticleScale = 0.2;
    back_emitter.setYSpeed(20, 100);
    back_emitter.gravity = 0;
    back_emitter.width = game.world.width * 1.5;
    back_emitter.minRotation = 0;
    back_emitter.maxRotation = 40;

    mid_emitter = game.add.emitter(game.world.centerX, -32, 250);
    mid_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
    mid_emitter.maxParticleScale = 1.2;
    mid_emitter.minParticleScale = 0.8;
    mid_emitter.setYSpeed(50, 150);
    mid_emitter.gravity = 0;
    mid_emitter.width = game.world.width * 1.5;
    mid_emitter.minRotation = 0;
    mid_emitter.maxRotation = 40;

    front_emitter = game.add.emitter(game.world.centerX, -32, 50);
    front_emitter.makeParticles('snowflakes_large', [0, 1, 2, 3, 4, 5]);
    front_emitter.maxParticleScale = 1;
    front_emitter.minParticleScale = 0.5;
    front_emitter.setYSpeed(100, 200);
    front_emitter.gravity = 0;
    front_emitter.width = game.world.width * 1.5;
    front_emitter.minRotation = 0;
    front_emitter.maxRotation = 40;

    back_emitter.start(false, 14000, 20);
    mid_emitter.start(false, 12000, 40);
    front_emitter.start(false, 6000, 1000);

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
    miplam = game.add.audio('plam', 1, true);

    //**Iniciamos el tiempo que creará nuevas estrellas y diamantes**//
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

    /**Para el puntaje**/
    textpuntos = game.add.text(innerWidth-100, 40, "Puntaje : 00", {
        font: "24px Arial",
        fill: "#ffffff",
        align: "center"
    });
    textpuntos.anchor.setTo(0.5, 0.5);

    /**Para las vidas**/
    textvidas = game.add.text(70, 40, "Vidas : 20", {
        font: "24px Arial",
        fill: "#ffffff",
        align: "center"
    });
    textvidas.anchor.setTo(0.5, 0.5);
}

function render() {

}



function update() {
    detectarColision();
    forzarPosicionPersonaje();
    verificarColisionWorld();
    actualizarPosicionNieve();
}


function detectarColision() {
    game.physics.arcade.collide(miestrella, mipersonaje, colisionoEstrella, null, this);
    game.physics.arcade.collide(midiamante, mipersonaje, colisionoDiamante, null, this);
}

function colisionoEstrella(obj1, obj2) {

    miestrella.destroy();
    ejecutarAudio(1);
    cambiarColor(2);
    calcularVidas();

}

function colisionoDiamante() {
    midiamante.destroy();
    ejecutarAudio(2);
    cambiarColor(1);
    crearPuntos();
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
            miplam.play('', 0, 1, false);
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

function calcularVidas() {
    vidas--;
    textvidas.setText('Vidas :' + vidas);
}
function crearPuntos(valor) {
    contadorPuntaje = contadorPuntaje + 100;
    textpuntos.setText('Puntos:' + contadorPuntaje );
}
function actualizarPosicionNieve() {
    i++;

    if (i === update_interval)
    {
        changeWindDirection();
        update_interval = Math.floor(Math.random() * 20) * 60; // 0 - 20sec @ 60fps
        i = 0;
    }
}

function changeWindDirection() {

    var multi = Math.floor((max + 200) / 4),
        frag = (Math.floor(Math.random() * 100) - multi);
    max = max + frag;

    if (max > 200) max = 150;
    if (max < -200) max = -150;

    setXSpeed(back_emitter, max);
    setXSpeed(mid_emitter, max);
    setXSpeed(front_emitter, max);

}

function setXSpeed(emitter, max) {

    emitter.setXSpeed(max - 20, max);
    emitter.forEachAlive(setParticleXSpeed, this, max);

}

function setParticleXSpeed(particle, max) {

    particle.body.velocity.x = max - Math.floor(Math.random() * 30);

}
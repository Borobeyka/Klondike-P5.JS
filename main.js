var config;
var card;

function preload() {
    config = loadJSON("config.json");
}

function setup() {
    createCanvas(config.app.width, config.app.height, P2D);
    background(config.colors.green);
    card = new Card(10, 10);
    card.draw();
    card = new Card(10, 10);
    card.draw();
}

function draw() {
    //print(card.isClicked());
}
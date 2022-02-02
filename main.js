var config;
var cards = [];
var cardIcons = new Map();

function preload() {
    config = loadJSON("config.json");
    cardIcons.set("clover", loadImage("assets/clover.png"))
    cardIcons.set("diamond", loadImage("assets/diamond.png"))
    cardIcons.set("heart", loadImage("assets/heart.png"))
    cardIcons.set("spade", loadImage("assets/spade.png"))
}

function setup() {
    createCanvas(config.app.width, config.app.height, P2D);
    background(config.color.green);
    smooth();

    cards.push(new Card(10, 10, "heart", 7));
    cards.push(new Card(130, 10, "diamond", 9));
    cards[0].draw();
    cards[1].draw();
}

function draw() {
    //print(card.isClicked());
}

function mousePressed() {
    if(mouseButton === LEFT) {
        cards.forEach(card => {
            if(card.isClicked())
                print("Clicked on card id: " + card.getID());
        });
    }
}
var config;
var cards = [];
var cardIcons = new Map();
var draggedCard = null;

function preload() {
    config = loadJSON("config.json");
    cardIcons.set("clover", loadImage("assets/clover.png"));
    cardIcons.set("diamond", loadImage("assets/diamond.png"));
    cardIcons.set("heart", loadImage("assets/heart.png"));
    cardIcons.set("spade", loadImage("assets/spade.png"));
}

function setup() {
    createCanvas(config.app.width, config.app.height, P2D);
    smooth();

    cards.push(new Card(10, 10, "heart", 0));
    cards.push(new Card(130, 10, "diamond", 9));
    
}

function draw() {
    background(config.color.green);
    cards.forEach(card => {
        card.show();
    });

    if(draggedCard != null)
        draggedCard.updateCoords();
}

function mousePressed() {
    if(mouseButton === LEFT) {
        cards.forEach(card => {
            if(card.isInArea())
            {
                draggedCard = card.getObject();
                draggedCard.mouseOffsetX = abs(mouseX - draggedCard.x);
                draggedCard.mouseOffsetY = abs(mouseY - draggedCard.y);
            }
        });
    }
}

function mouseReleased() {
    if(mouseButton === LEFT && draggedCard != null)
    {
        draggedCard = null;
    }
}
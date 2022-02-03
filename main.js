var config;
var cards = [];
var cardIcons = new Map();
var draggedCard = null;
var stacks = [];

function preload() {
    config = loadJSON("config.json");
    cardIcons.set("clover", loadImage("assets/clover.png"));
    cardIcons.set("diamond", loadImage("assets/diamond.png"));
    cardIcons.set("heart", loadImage("assets/heart.png"));
    cardIcons.set("spade", loadImage("assets/spade.png"));
    cardIcons.set("suit", loadImage("assets/suit.png"));
}

function setup() {
    createCanvas(config.app.width, config.app.height, P2D);
    frameRate(60);
    smooth();


    for(var i = 0, x = 10; i < 7; i++, x += config.card.width + config.card.stroke + config.stack.offset) {
        stacks.push(new Stack(x, config.stack.paddingY));
        stacks[i].show();
    }


    cards.push(new Card(10, 400, "heart", 0));
    cards.push(new Card(130, 400, "diamond", 9)); 
    cards.push(new Card(250, 400, "spade", 8)); 
    cards.push(new Card(370, 400, "clover", 12)); 

    
    
}

function showFPS() {
    if(config.app.debug)
    {
        textSize(20);
        text(int(frameRate()), config.app.width - 25, 5);
    }
}

function draw() {
    background(config.color.green);
    showFPS();

    stacks.forEach(stack => {
        stack.show();
    });

    cards.forEach(card => {
        card.show();
    });

    if(draggedCard != null)
        draggedCard.updateCoords();
}

function mousePressed() {
    if(mouseButton === LEFT) {
        cards.forEach(card => {
            if(card.isInArea() && card.isVisible)
            {
                draggedCard = card.getObject();
                draggedCard.saveOldCoords();
                draggedCard.mouseOffsetX = abs(mouseX - draggedCard.x);
                draggedCard.mouseOffsetY = abs(mouseY - draggedCard.y);
            }
        });
    }
}

function mouseReleased() {
    if(mouseButton === LEFT && draggedCard != null)
    {
        stacks.forEach(stack => {
            if(stack.isInArea()) {                  
                stack.addCard(draggedCard = null);
            }
        });
        //draggedCard.returnPrevPosition();
        draggedCard = null;
    }
        
}
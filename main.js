var config;
var cards = [];
var cardIcons = new Map();
var draggedCard = null;
var draggedHeap = null;
var stacks = [];

var _suits = [ "clover", "diamond", "heart", "spade" ];
var _cards = [];

function preload() {
    config = loadJSON("config.json");
    cardIcons.set("clover", loadImage("assets/clover.png"));
    cardIcons.set("diamond", loadImage("assets/diamond.png"));
    cardIcons.set("heart", loadImage("assets/heart.png"));
    cardIcons.set("spade", loadImage("assets/spade.png"));
    cardIcons.set("suit", loadImage("assets/suit.png"));
}

function setup() {
    var divs = document.getElementsByClassName("info");
    for(var i = 0; i < divs.length; i++) divs[i].style.width = config.app.width + "px";

    createCanvas(config.app.width, config.app.height, P2D);
    
    frameRate(60);
    smooth();

    for(var i = 0, x = 10; i < 7; i++, x += config.card.width + config.card.stroke + config.stack.offset) {
        stacks.push(new Stack(x, config.stack.paddingY));
        stacks[i].show();
    }

    

    for(var i = 0; i < 4; i++)
        for(var j = 0; j < 13; j++)
            _cards.push(new Card(0, 0, _suits[i], j));

    for(var i = 0; i < 7; i++)
        for(var j = 0; j < i + 1; j++) {
            if((i + 1) - j == 1)
                stacks[i].pushCard(_cards[getRandomInt(_cards.length)]);
            else {  
                var card = _cards[getRandomInt(_cards.length)];
                card.setVisible(false);
                stacks[i].pushCard(card);
            }
        }

    print(_cards);



    // cards.push(new Card(10, 400, "clover", 10));
    // cards.push(new Card(130, 400, "diamond", 11));
    // cards.push(new Card(250, 400, "spade", 11));
    // cards.push(new Card(370, 400, "clover", 12));
}

function showFPS() {
    if(config.app.debug) {
        fill(0);
        textSize(20);
        text("FPS: " + int(frameRate()), config.app.width - 76, 5);
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
    if(draggedHeap != null)
    {
        draggedHeap.updateCoords();
        draggedHeap.cards.forEach(card => {
            card.show();
        })
    }
        
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

        stacks.forEach(stack => {
            if(stack.isInArea()) {
                draggedHeap = stack.getHeapOnFocus();
                if(typeof draggedHeap != "undefined") {
                    print(draggedHeap);
                    draggedHeap.saveOldCoords();
                    draggedHeap.mouseOffsetX = abs(mouseX - draggedHeap.x);
                    draggedHeap.mouseOffsetY = abs(mouseY - draggedHeap.y);
                }
                
            }
        });
    }
}

function mouseReleased() {
    if(mouseButton === LEFT && draggedCard != null)
    {
        stacks.forEach(stack => {
            if(stack.isInArea()) {                  
                stack.addCard(draggedCard);
            }
        });
        if(draggedCard != null)
        {
            draggedCard.returnPrevPosition();
            draggedCard = null;
        }
        if(draggedHeap != null)
        {
            draggedHeap.returnPrevPosition();
            draggedHeap = null;
        }
    }
        
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
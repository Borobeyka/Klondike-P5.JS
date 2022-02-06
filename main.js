var config;
var cards = [];
var cardIcons = new Map();
var draggedHeap = null;
var draggedStack = null;
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
    for(var i = 0; i < 7; i++) {
        for(var j = 0; j < i + 1; j++) {
            if((i + 1) - j == 1)
                stacks[i].pushCard(_cards[getRandomInt(_cards.length)]);
            else {  
                var card = _cards[getRandomInt(_cards.length)];
                card.setVisible(false);
                stacks[i].pushCard(card);
            }
        }
    }
    //stacks[6].pushCard(_cards[getRandomInt(_cards.length)]);
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

    if(draggedHeap != null)
    {
        draggedHeap.updateCoords();
        draggedHeap.show();
    }
        
}

function mousePressed() {
    if(mouseButton === LEFT) {
        stacks.forEach(stack => {
            if(stack.isInArea() && !stack.isEmpty()) {
                draggedHeap = stack.getHeapOnFocus();
                draggedStack = stack;
                if(typeof draggedHeap != "undefined")
                    draggedHeap.saveOldCoords();
            }
        });
    }
}

function mouseReleased() {
    if(mouseButton === LEFT && draggedHeap != null)
    {
        stacks.forEach(stack => {
            if(stack.isInArea()) {
                if(stack.isCanStack(draggedHeap)) {
                    stack.pushHeap(draggedHeap);
                    if(draggedStack.count() > 0)
                        draggedStack.getLastCard().setVisible(true);
                    draggedHeap = null;
                }  
            }
        });

        if(draggedHeap != null)
        {
            draggedStack.pushHeap(draggedHeap);
            draggedHeap.returnPrevPosition();
            draggedHeap = null;
            draggedStack = null;
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
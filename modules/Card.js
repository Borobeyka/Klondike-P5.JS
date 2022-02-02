class Card {
    static TOTAL_CARDS = 0;

    constructor(x, y) {
        
        this.id = ++Card.TOTAL_CARDS;
        this.x = x;
        this.y = y;
    }

    draw() {
        strokeWeight(config.card.stroke);
        stroke(config.colors.black);
        fill(config.colors.white);
        rect(this.x, this.y, config.card.width, config.card.height, config.card.round);
        print("Draw ID: " + this.id);
    }

    updateCoords(x, y) {
        this.x += x;
        this.y += y;
    }

    isClicked() {
        if(mouseX > this.x && mouseX < this.x + config.card.width + config.card.stroke &&
            mouseY > this.y && mouseY < this.y + config.card.height + config.card.stroke &&
            mouseIsPressed == true && mouseButton === LEFT)
            return true;
        return false;
    }

    getID() {
        return this.id;
    }
}
class Card {
    static TOTAL_CARDS = 0;

    constructor(x, y, suit, nominal) {
        this.id = ++Card.TOTAL_CARDS;

        this.x = x;
        this.y = y;
        this.suit = suit;
        this.nominal = nominal;
        this.icon = cardIcons.get(this.suit);
        this.iconColor = suit == "heart" || suit == "spade" ? config.color.red : config.color.black;
        print(this.iconColor);
    }

    draw() {
        
        
        strokeWeight(config.card.stroke);
        stroke(config.color.black);
        fill(config.color.white);
        rect(this.x, this.y, config.card.width, config.card.height, config.card.round);

        noStroke();
        fill(this.iconColor);
        textStyle(BOLD);
        textAlign(LEFT, TOP);
        textSize(config.card.properties.textSize);
        text(this.nominal, this.x + config.card.properties.offset.x, this.y + config.card.properties.offset.y);


        tint(this.iconColor);
        image(this.icon, this.x + config.card.properties.offset.x, this.y + config.card.properties.offset.y + config.card.properties.textSize, config.card.properties.icon.width, config.card.properties.icon.height);
        
    }

    updateCoords(x, y) {
        this.x += x;
        this.y += y;
    }

    isClicked() {
        if(mouseX > this.x && mouseX < this.x + config.card.width + config.card.stroke &&
            mouseY > this.y && mouseY < this.y + config.card.height + config.card.stroke &&
            mouseIsPressed == true)
            return true;
        return false;
    }

    getID() {
        return this.id;
    }
}
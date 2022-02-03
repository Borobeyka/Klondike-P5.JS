class Card {
    static TOTAL_CARDS = 0;

    constructor(x, y, suit, nominal, isVisible = true) {
        this.id = ++Card.TOTAL_CARDS;

        this.x = x;
        this.y = y;
        this.suit = suit;
        this.nominal = nominal;
        this.isVisible = isVisible;
        this.icon = cardIcons.get(this.suit);
        this.suitIcon = cardIcons.get("suit");
        this.iconColor = (suit == "heart" || suit == "diamond") ? config.color.red : config.color.black;
    }

    show() {
        if(this.isVisible) {
            strokeWeight(config.card.stroke);
            stroke(config.color.black);
            fill(config.color.white);
            rect(this.x, this.y, config.card.width, config.card.height, config.card.round);

            noStroke();
            fill(this.iconColor);
            textStyle(BOLD);
            textAlign(LEFT, TOP);
            textSize(config.card.properties.textSize);
            text(config.nominal[this.nominal], this.x + config.card.properties.icon.offset, this.y + config.card.properties.icon.offset);

            image(this.icon, this.x + config.card.width - config.card.properties.icon.offset - config.card.properties.icon.width,
                this.y + config.card.properties.icon.offset,
                config.card.properties.icon.width, config.card.properties.icon.height);
            image(this.icon, this.x + config.card.width / 2 - config.card.properties.iconLarge.width / 2,
                this.y + config.card.properties.iconLarge.offset,
                config.card.properties.iconLarge.width, config.card.properties.iconLarge.height);
        }
        else {
            strokeWeight(config.card.stroke);
            stroke(config.color.black);
            fill(config.color.grey);
            rect(this.x, this.y, config.card.width, config.card.height, config.card.round);

            // suit image
            // noTint();
            // noFill();
            // image(cardIcons.get("suit"), this.x, this.y, config.card.width, config.card.height);
            // strokeWeight(config.card.stroke);
            // stroke(config.color.black);
            // rect(this.x, this.y, config.card.width, config.card.height, config.card.round);
        }
    }

    returnPrevPosition() {
        this.x = this.oldX;
        this.y = this.oldY;
    }

    saveOldCoords() {
        this.oldX = this.x;
        this.oldY = this.y;
    }

    updateCoords() {
        this.x += (mouseX - this.x - this.mouseOffsetX) * 0.35;
        this.y += (mouseY - this.y - this.mouseOffsetY) * 0.35;
    }

    isInArea() {
        if(mouseX > this.x && mouseX < this.x + config.card.width + config.card.stroke &&
            mouseY > this.y && mouseY < this.y + config.card.height + config.card.stroke )
            return true;
        return false;
    }

    getObject() {
        this.saveOldCoords();
        return this;
    }

    setVisible(status) {
        this.isVisible = status;
    }
}
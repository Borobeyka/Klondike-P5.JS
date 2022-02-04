class Heap {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.cards = [];
    }

    addCard(card) {
        this.cards.push(card);
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
        this.x += (mouseX - this.x - this.mouseOffsetX) * config.animationMultiplier;
        this.y += (mouseY - this.y - this.mouseOffsetY) * config.animationMultiplier;
        //print(this.x, this.y);
    }
}
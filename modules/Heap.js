class Heap {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.cards = [];
    }

    show() {
        this.cards.forEach(card => {
            card.show();
        });
    }

    count() {
        return this.cards.length;
    }

    addCard(card) {
        this.cards.push(card);
    }

    returnPrevPosition() {
        this.x = this.oldX;
        this.y = this.oldY;

        this.cards.forEach((card, id) => {
            card.x = this.x;
            card.y = this.y + id * config.stack.offset;
        });
    }

    saveOldCoords() {
        this.oldX = this.x;
        this.oldY = this.y;
    }

    updateCoords() {
        this.x += (mouseX - this.x - this.mouseOffsetX) * config.animationMultiplier;
        this.y += (mouseY - this.y - this.mouseOffsetY) * config.animationMultiplier;

        this.cards.forEach((card, id) => {
            card.x = this.x;
            card.y = this.y + id * config.stack.offset;
        });
    }
}
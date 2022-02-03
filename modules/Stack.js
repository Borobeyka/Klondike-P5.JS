class Stack {
    static TOTAL_STACKS = 0;

    constructor(x, y) {
        this.id = ++Stack.TOTAL_STACKS;

        this.x = x;
        this.y = y;
        this.cards = [];
    }
    
    show() {
        if(this.isEmpty()) {
            strokeWeight(config.card.stroke);
            stroke(config.color.lightgreen);
            fill(config.color.darkgreen);
            rect(this.x, this.y, config.card.width, config.card.height, config.card.round);
        }
        else {
            this.cards.forEach(card => {
                card.show();
            });
        }
    }

    count() {
        return this.cards.length;
    }

    isEmpty() {
        return this.count() > 0 ? false : true;
    }

    isInArea() {
        if(mouseX > this.x && mouseX < this.x + config.card.width + config.card.stroke &&
            mouseY > this.y && mouseY < this.y + config.card.height + config.card.stroke +
            (this.count() == 1 || this.count() == 0) ? 0 : (this.count() - 1) * config.stack.offset)
            return true;
        return false;
    }

    getCardOnFocus() {
        for(var i = this.count() - 1; i >= 0; i--)
            if(this.cards[i].isInArea())
                return this.cards[i];
    }

    getLastCard() {
        return this.cards.at(-1);
    }

    addCard(card) {
        if(this.isEmpty() && card.nominal != 12) return;
        if(this.count() >= 1 && (this.getLastCard().iconColor == card.iconColor || this.getLastCard().nominal - card.nominal != 1)) return;

        cards.splice(cards.map(_card => {
            return _card.id;
        }).indexOf(card.id), 1);

        card.x = this.x;
        card.y = this.y + this.count() * config.stack.offset;
        this.cards.push(card);

        draggedCard = null;
    }
            

    // addHeap(heap) {
    // }
}
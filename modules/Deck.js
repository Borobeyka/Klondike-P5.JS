class Deck {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.cards = [];
        this.currentCard = null;
    }

    addCard(card) {
        card.x = this.x;
        card.y = this.y;
        card.setVisible(false);
        this.cards.push(card);
    }

    getLastCard() {
        return this.cards.at(-1);
    }

    show() {
        var lastCard;
        if(this.currentCard != null) {
            this.currentCard.show();
            lastCard = this.cards[this.cards.indexOf(this.currentCard) - 1];
        }
        else lastCard = this.getLastCard();
        if(typeof lastCard == "undefined") {
            strokeWeight(config.card.stroke);
            stroke(config.color.lightgreen);
            fill(config.color.darkgreen);
            rect(this.x, this.y, config.card.width, config.card.height, config.card.round);
        }
        else lastCard.show();

        
    }

    isInArea() {
        if(mouseX > this.x && mouseX < this.x + config.card.width + config.card.stroke &&
            mouseY > this.y && mouseY < this.y + config.card.height + config.card.stroke)
            return true;
        return false;
    }

    pickCard() {
        this.currentCard = this.getLastCard();
        this.currentCard.setVisible(true);
        //print(this.currentCard);
        this.currentCard.x -= config.card.width + config.card.stroke + config.stack.offset;
        this.currentCard.show();
    }

    count() {
        return this.cards.length;
    }

    getHeapOnFocus() {
        for(var i = this.count() - 1; i >= 0; i--) {
            if(this.cards[i].isInArea() && this.cards[i].isVisible)
            {
                var heap = new Heap(this.cards[i].x, this.cards[i].y);
                heap.mouseOffsetX = abs(mouseX - heap.x);
                heap.mouseOffsetY = abs(mouseY - heap.y);
                var idx = this.cards.indexOf(this.cards[i]);

                this.cards.forEach((card, index) => {
                    if(index >= idx)
                        heap.addCard(card);
                });
                this.cards.splice(idx, this.count() == 1 ? 1 : this.count());
                return heap;
            }
        }
        return;
    }
}
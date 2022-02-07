class Deck {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.cards = [];
        this.curCardIndex = null;
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
        if(this.curCardIndex != null) {
            this.cards[this.curCardIndex].show();
        }
        else {
            this.cards.forEach(card => {
                card.x = this.x;
                card.setVisible(false);
            });
        }

        if(typeof this.cards[this.curCardIndex + 1] != "undefined") {
            this.cards[this.curCardIndex + 1].show();
        }
        else {
            strokeWeight(config.card.stroke);
            stroke(config.color.lightgreen);
            fill(config.color.darkgreen);
            rect(this.x, this.y, config.card.width, config.card.height, config.card.round);
            
        }
    }

    pickCard() {
        if(this.curCardIndex == null) this.curCardIndex = 0;
        else this.curCardIndex++;
        if(this.curCardIndex == this.count()) this.curCardIndex = null;
        else {
            this.cards[this.curCardIndex].setVisible(true);
            this.cards[this.curCardIndex].x -= config.card.width + config.card.stroke + config.stack.offset;
            this.cards[this.curCardIndex].show();
        }
        print(this.curCardIndex);
    }

    isInArea() {
        if(mouseX > this.x && mouseX < this.x + config.card.width + config.card.stroke &&
            mouseY > this.y && mouseY < this.y + config.card.height + config.card.stroke)
            return true;
        return false;
    }

    count() {
        return this.cards.length;
    }

    getHeapOnFocus() {
        var heap;
        this.cards.forEach(card => {
            if(card.isInArea() && card.isVisible) {
                var card = this.cards[this.curCardIndex];
                heap = new Heap(card.x, card.y);
                heap.mouseOffsetX = abs(mouseX - heap.x);
                heap.mouseOffsetY = abs(mouseY - heap.y);
                card.setVisible(true);
                heap.addCard(card);
                this.cards.splice(this.curCardIndex, 1);
            }
        });
        return heap;
    }

    pushHeap(heap) {
        this.cards.splice(this.curCardIndex, 0, heap.cards[0]);
    }
}
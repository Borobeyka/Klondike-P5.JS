class Storage {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.cards = [];
    }

    count() {
        return this.cards.length;
    }

    isEmpty() {
        return this.count() > 0 ? false : true;
    }

    show() {
        if(this.isEmpty()) {
            strokeWeight(config.card.stroke);
            stroke(config.color.lightgreen);
            fill(config.color.darkgreen);
            rect(this.x, this.y, config.card.width, config.card.height, config.card.round);
        }
        else {
            var card = this.getLastCard();
            card.show();
        }
    }

    isInArea() {
        if(mouseX > this.x && mouseX < this.x + config.card.width + config.card.stroke &&
            mouseY > this.y && mouseY < this.y + config.card.height + config.card.stroke)
            return true;
        return false;
    }

    getLastCard() {
        return this.cards.at(-1);
    }

    isCanStack(heap) {
        if(this.isEmpty() && heap.cards[0].nominal != 0)
            return false;
        if(this.count() >= 1 && (this.getLastCard().suit != heap.cards[0].suit ||
            heap.cards[0].nominal - this.getLastCard().nominal != 1))
                return false;
        if(heap.count() > 1) return false;
        return true;
    }

    getHeapOnFocus() {
        var card = this.getLastCard();
        var heap = new Heap(card.x, card.y);
        heap.mouseOffsetX = abs(mouseX - heap.x);
        heap.mouseOffsetY = abs(mouseY - heap.y);
        //card.setVisible(true);
        heap.addCard(card);
        this.cards.splice(this.cards.indexOf(card), 1);
        return heap;
    }

    pushHeap(heap) {
        heap.cards[0].x = this.x;
        heap.cards[0].y = this.y;
        this.cards.push(heap.cards[0]);
    }
}
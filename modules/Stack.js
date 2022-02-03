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
            stroke(config.color.black);
            fill(config.color.darkgreen);
            rect(this.x, this.y, config.card.width, config.card.height, config.card.round);
        }
        else {
            this.cards.forEach(card => {
                card.show();
            });
        }
    }

    isEmpty() {
        return this.cards.length > 0 ? false : true;
    }

    isInArea() {
        if(mouseX > this.x && mouseX < this.x + config.card.width + config.card.stroke &&
            mouseY > this.y && mouseY < this.y + config.card.height + config.card.stroke)
            return true;
        return false;
    }

    addCard(card) {
        if(this.isEmpty && card.nominal != 12) return;

        cards.splice(cards.map(_card => {
            return _card.id;
        }).indexOf(card.id), 1);
        
        card.x = this.x;
        card.y = this.y + this.cards.length * config.stack.offset;
        this.cards.push(card);
    }
            

    // addHeap(heap) {
    // }
}
class Monster {

    constructor(pos, speed, reset) {
        this.pos = pos;
        this.speed = speed;
        this.reset = reset;
    }

    get type() { return "monster"; }

    static create(pos, ch) {
        if (ch == "=") {
            return new Monster(pos, new Vec(2, 0));
        } else if (ch == "|") {
            return new Monster(pos, new Vec(0, 2));
        }
    }
}

Monster.prototype.size = new Vec(1, 2);
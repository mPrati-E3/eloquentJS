/*class OttError extends Error {}

function primitiveMultiply(a,b){
    let r = Math.random()*100;
    if (r<=20){
        return a*b;
    } else {
        throw new OttError ();
    }
}

const a=5;
const b=10;
try {
    console.log(primitiveMultiply(a,b));
} catch (e){
    if (e instanceof OttError){
        console.log("80% non moltiplico");
    } else {
        throw e;
    }
}*/

const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

function withBoxUnlocked(body) {
    if (box.locked) {
        box.unlock();
    }
    try {
        body();
    } finally {
        box.lock();
    }
}

withBoxUnlocked(() => {
    box.content.push("gold piece");
});

try {
    withBoxUnlocked(() => {
        throw new Error("Pirates on the horizon! Abort!");
    });
} catch (e) {
    console.log("Error raised:", e);
}

console.log(box.locked);
// → true
    
const springLength = 40;
const springStrength = 0.1;

const repulsionStrength = 1500;

function forceDirected_simple(graph) {
    for (let node of graph) {
        for (let other of graph) {
            if (other == node) continue;
            let apart = other.pos.minus(node.pos);
            let distance = Math.max(1, apart.length);
            let forceSize = -repulsionStrength / (distance * distance);
            if (node.hasEdge(other)) {
                forceSize += (distance - springLength) * springStrength;
            }
            let normalized = apart.times(1 / distance);
            node.pos = node.pos.plus(normalized.times(forceSize));
        }
    }
}

function forceDirected_noVector(graph) {
    for (let i = 0; i < graph.length; i++) {
        let node = graph[i];
        for (let j = i + 1; j < graph.length; j++) {
            let other = graph[j];
            let apartX = other.pos.x - node.pos.x;
            let apartY = other.pos.y - node.pos.y;
            let distance = Math.max(1, Math.sqrt(apartX * apartX + apartY * apartY));
            let hasEdge = node.hasEdgeFast(other);
            if (!hasEdge && distance > skipDistance) continue;
            let forceSize = -repulsionStrength / (distance * distance);
            if (hasEdge) {
                forceSize += (distance - springLength) * springStrength;
            }
            let forceX = apartX * forceSize / distance;
            let forceY = apartY * forceSize / distance;
            node.pos.x += forceX; node.pos.y += forceY;
            other.pos.x -= forceX; other.pos.y -= forceY;
        }
    }
}

function runLayout(implementation, graph) {

    function run(steps, time) {
        let startTime = Date.now();
        for (let i = 0; i < 100; i++) {
            implementation(graph);
        }
        time += Date.now() - startTime;
        drawGraph(graph);
        if (steps == 0) console.log(time);
        else requestAnimationFrame(() => run(steps - 100, time));
    }

    run(4000, 0);
}


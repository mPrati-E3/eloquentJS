function forceDirected_noRepeat(graph) {
    for (let i = 0; i < graph.length; i++) {
        let node = graph[i];
        for (let j = i + 1; j < graph.length; j++) {
            let other = graph[j];
            let apart = other.pos.minus(node.pos);
            let distance = Math.max(1, apart.length);
            let forceSize = -repulsionStrength / (distance * distance);
            if (node.hasEdge(other)) {
                forceSize += (distance - springLength) * springStrength;
            }
            let applied = apart.times(forceSize / distance);
            node.pos = node.pos.plus(applied);
            other.pos = other.pos.minus(applied);
        }
    }
}

const skipDistance = 175;

function forceDirected_skip(graph) {
    for (let i = 0; i < graph.length; i++) {
        let node = graph[i];
        for (let j = i + 1; j < graph.length; j++) {
            let other = graph[j];
            let apart = other.pos.minus(node.pos);
            let distance = Math.max(1, apart.length);
            let hasEdge = node.hasEdge(other);
            if (!hasEdge && distance > skipDistance) continue;
            let forceSize = -repulsionStrength / (distance * distance);
            if (hasEdge) {
                forceSize += (distance - springLength) * springStrength;
            }
            let applied = apart.times(forceSize / distance);
            node.pos = node.pos.plus(applied);
            other.pos = other.pos.minus(applied);
        }
    }
}
class Vec {

    constructor(x, y) {
        this.x = x; this.y = y;
    }

    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }

    times(factor) {
        return new Vec(this.x * factor, this.y * factor);
    }

}

class GraphNode {

    constructor() {
        this.pos = new Vec(Math.random() * 1000, Math.random() * 1000);
        this.edges = [];
    }

    connect(other) {
        this.edges.push(other);
        other.edges.push(this);
    }

    hasEdge(other) {
        return this.edges.includes(other);
    }
}

GraphNode.prototype.hasEdgeFast = function(other) {
    for (let i = 0; i < this.edges.length; i++) {
        if (this.edges[i] === other) return true;
    }
    return false;
};

function treeGraph(depth, branches) {
    let graph = [new GraphNode()];
    if (depth > 1) {
        for (let i = 0; i < branches; i++) {
            let subGraph = treeGraph(depth - 1, branches);
            graph[0].connect(subGraph[0]);
            graph = graph.concat(subGraph);
        }
    }
    return graph;
}
        
    
  
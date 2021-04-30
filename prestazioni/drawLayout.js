class Vec {

    constructor(x, y) {
      this.x = x; this.y = y;
    }

    plus(other) {
      return new Vec(this.x + other.x, this.y + other.y);
    }

    minus(other) {
      return new Vec(this.x - other.x, this.y - other.y);
    }

    times(factor) {
      return new Vec(this.x * factor, this.y * factor);
    }

    get length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }

}

const nodeSize = 8;
  
function drawGraph(graph) {
  let canvas = document.querySelector("canvas");
  if (!canvas) {
    canvas = document.body.appendChild(document.createElement("canvas"));
    canvas.width = canvas.height = 400;
  }
  let cx = canvas.getContext("2d");
  
  cx.clearRect(0, 0, canvas.width, canvas.height);
  let scale = new Scale(graph, canvas.width, canvas.height);
  
  cx.strokeStyle = "orange";
  cx.lineWidth = 3;
  for (let i = 0; i < graph.length; i++) {
    let origin = graph[i];
    for (let target of origin.edges) {
      if (graph.indexOf(target) <= i) continue;
      cx.beginPath();
      cx.moveTo(scale.x(origin.pos.x), scale.y(origin.pos.y));
      cx.lineTo(scale.x(target.pos.x), scale.y(target.pos.y));
      cx.stroke();
    }
  }

  cx.fillStyle = "purple";
  for (let node of graph) {
    cx.beginPath();
    cx.arc(scale.x(node.pos.x), scale.y(node.pos.y), nodeSize, 0, 7);
    cx.fill();
  }
}
  
class Scale {

  constructor(graph, width, height) {
    let xs = graph.map(node => node.pos.x);
    let ys = graph.map(node => node.pos.y);
    let minX = Math.min(...xs);
    let minY = Math.min(...ys);
    let maxX = Math.max(...xs);
    let maxY = Math.max(...ys);
  
    this.offsetX = minX; this.offsetY = minY;
    this.scaleX = (width - 2 * nodeSize) / (maxX - minX);
    this.scaleY = (height - 2 * nodeSize) / (maxY - minY);
  }
  
  x(x) {
    return this.scaleX * (x - this.offsetX) + nodeSize;
  }

  y(y) {
    return this.scaleY * (y - this.offsetY) + nodeSize;
  }

}
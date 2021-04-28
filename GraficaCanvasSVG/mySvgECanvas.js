
let cx1 = document.getElementById("cx1").getContext("2d");

// Un trapezoide (un rettangolo con un lato più largo degli altri).

function trapezio(x, y) {
    cx1.beginPath();
    cx1.moveTo(x, y);
    cx1.lineTo(x + 50, y);
    cx1.lineTo(x + 70, y + 50);
    cx1.lineTo(x - 20, y + 50);
    cx1.closePath();
    cx1.stroke();
  }
  trapezio(30, 30);

// Un rombo rosso (un rettangolo ruotato di 45° o 1/4π radianti).

function rombo(x, y) {
    cx1.translate(x + 30, y + 30);
    cx1.rotate(Math.PI / 4);
    cx1.fillStyle = "red";
    cx1.fillRect(-30, -30, 60, 60);
    cx1.resetTransform();
  }

  rombo(140, 30);
  
// Una linea a zig zag.

function zigzag(x, y) {
    cx1.beginPath();
    cx1.moveTo(x, y);
    for (let i = 0; i < 8; i++) {
        cx1.lineTo(x + 80, y + i * 8 + 4);
        cx1.lineTo(x, y + i * 8 + 8);
    }
    cx1.stroke();
}

zigzag(240, 20);

// Una spirale costruita con 100 segmenti di linea retta.

function spiral(x, y) {
    let radius = 50, xCenter = x + radius, yCenter = y + radius;
    cx1.beginPath();
    cx1.moveTo(xCenter, yCenter);
    for (let i = 0; i < 300; i++) {
      let angle = i * Math.PI / 30;
      let dist = radius * i / 300;
      cx1.lineTo(xCenter + Math.cos(angle) * dist,
                yCenter + Math.sin(angle) * dist);
    }
    cx1.stroke();
  }
  
spiral(340, 20);

// Una stella gialla.

function star(x, y) {
    let radius = 50, xCenter = x + radius, yCenter = y + radius;
    cx1.beginPath();
    cx1.moveTo(xCenter + radius, yCenter);
    for (let i = 1; i <= 8; i++) {
      let angle = i * Math.PI / 4;
      cx1.quadraticCurveTo(xCenter, yCenter,
                          xCenter + Math.cos(angle) * radius,
                          yCenter + Math.sin(angle) * radius);
    }
    cx1.fillStyle = "gold";
    cx1.fill();
  }

star(440, 20);

// Il grafico a torta
// In precedenza, in questo capitolo, abbiamo visto un esempio di come disegnare un grafico a
// torta. Modificate quel programma in modo che mostri il nome delle categorie vicino alla fetta
// che le rappresenta. Cercate un modo per posizionare il testo che risulti piacevole da vedere e
// funzioni anche per altre serie di dati. Potete presumere che le categorie siano sufficientemente
// grandi da lasciare ampio spazio per le etichette.
// Anche per questo esercizio, come nel precedente, potrebbero tornarvi buoni Math.sin e
// Math.cos.

var results = [
    {name: "Satisfied", count: 1043, color: "lightblue"},
    {name: "Neutral", count: 563, color: "lightgreen"},
    {name: "Unsatisfied", count: 510, color: "pink"},
    {name: "No comment", count: 175, color: "silver"}
];

let cx2 = document.getElementById("cx2").getContext("2d");

let total = results.reduce(function(sum, choice) {
    return sum + choice.count;
}, 0);

let currentAngle = -0.5 * Math.PI;
let centerX = 300, centerY = 150;

results.forEach(function(result) {

    let sliceAngle = (result.count / total) * 2 * Math.PI;
    cx2.beginPath();
    cx2.arc(centerX, centerY, 100,currentAngle, currentAngle + sliceAngle);

    let middleAngle = currentAngle + 0.5 * sliceAngle;
    let textX = Math.cos(middleAngle) * 120 + centerX;
    let textY = Math.sin(middleAngle) * 120 + centerY;
    cx2.textBaseLine = "middle";

    if (Math.cos(middleAngle) > 0) {
      cx2.textAlign = "left";
    } else {
      cx2.textAlign = "right";
    }
    cx2.font = "15px sans-serif";
    cx2.fillStyle = "black";
    cx2.fillText(result.name, textX, textY);

    currentAngle += sliceAngle;
    cx2.lineTo(centerX, centerY);
    cx2.fillStyle = result.color;
    cx2.fill();
});


// Una palla che rimbalza
// Usate la tecnica di requestAnimationFrame, descritta nei Capitoli 14 e 16, per disegnare una scatola
// che contenga una palla che rimbalza. La palla si muove a velocità costante e rimbalza sulle pareti
// della scatola quando le colpisce.

let cx3 = document.getElementById("cx3").getContext("2d");

let lastTime = null;

function frame(time) {
  if (lastTime != null) {
    updateAnimation(Math.min(100, time - lastTime) / 1000);
  }
  lastTime = time;
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

let x = 100, y = 300;
let radius = 10;
let speedX = 100, speedY = 60;

function updateAnimation(step) {
  cx3.clearRect(0, 0, 400, 400);
  cx3.strokeStyle = "blue";
  cx3.lineWidth = 4;
  cx3.strokeRect(25, 25, 350, 350);
  
  x += step * speedX;
  y += step * speedY;
  if (x < 25 + radius || x > 375 - radius) speedX = -speedX;
  if (y < 25 + radius || y > 375 - radius) speedY = -speedY;
  cx3.fillStyle = "red";
  cx3.beginPath();
  cx3.arc(x, y, radius, 0, 7);
  cx3.fill();
}
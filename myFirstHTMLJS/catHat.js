let h1 = document.getElementById('titolo');

h1.insertAdjacentHTML('afterend',
                        `<p style="text-align: center">
                            <img id="gatto" src="./cat.png" style="position: relative">
                            <img id="cappello" src="./hat.png" style="position: relative">
                        </p>
                        `)

let cat = document.getElementById("gatto");
let hat = document.getElementById("cappello");

let angle = Math.PI / 2;

function animate(time, lastTime) {
    if (lastTime != null) {
        angle += (time - lastTime) * 0.001;
    }

    cat.style.top = (Math.sin(angle) * 20) + "px";
    cat.style.left = (Math.cos(angle) * 200) + "px";
    hat.style.top = (Math.sin(angle) * -20) + "px";
    hat.style.left = (Math.cos(angle) * -200) + "px";

    requestAnimationFrame(newTime => animate(newTime, time));
}

requestAnimationFrame(animate);




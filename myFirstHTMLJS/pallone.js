h1.insertAdjacentHTML('afterend',
                        `<p style="text-align: center">
                            <img id="pallone" src="./pallone.png" style="max-width: 10%; max-height: 10%; position: center">
                        </p>
                        `)

let pall = document.getElementById("pallone");

let cont = 10;

window.addEventListener("keydown", handleKeyDown);

function handleKeyDown(event){

    const key = event.key;
    event.preventDefault();

    if (key != "ArrowUp" && key != "ArrowDown"){
        return;
    }

    if (key == "ArrowUp") {
        cont+=10;
        if (cont>=50){
            pall.setAttribute("src",`./explosion.png`);
            window.removeEventListener("keydown",handleKeyDown);
        }
    } else if (key == "ArrowDown"){
        if (cont>=20) cont-=10;
    }


    pall.setAttribute("style",`max-width: ${cont}%; max-height: ${cont}%; position: center`);
}


        


/*simpleLevel = new Level(simpleLevelPlan);
    
let display = new DOMDisplay(document.body, simpleLevel);
    
display.syncState(State.start(simpleLevel));*/

function runAnimation(frameFunc) {
    let lastTime = null;

    function frame(time) {
        if (lastTime != null) {
            let timeStep = Math.min(time - lastTime, 100) / 1000;
            if (frameFunc(timeStep) === false) return;
        }
        lastTime = time;
        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

function runLevel(level, Display) {
    let display = new Display(document.body, level);
    let state = State.start(level);
    let ending = 1;
    let running = "yes";

    return new Promise(resolve => {
      function escHandler(event) {
        if (event.key != "Escape") return;
        event.preventDefault();
        if (running == "no") {
          running = "yes";
          runAnimation(frame);
        } else if (running == "yes") {
          running = "pausing";
        } else {
          running = "yes";
        }
      }
      window.addEventListener("keydown", escHandler);
      let arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

      function frame(time) {
        if (running == "pausing") {
          running = "no";
          return false;
        }

        state = state.update(time, arrowKeys);
        display.syncState(state);
        if (state.status == "playing") {
          return true;
        } else if (ending > 0) {
          ending -= time;
          return true;
        } else {
          display.clear();
          window.removeEventListener("keydown", escHandler);
          arrowKeys.unregister();
          resolve(state.status);
          return false;
        }
      }
      runAnimation(frame);
    });
  }


async function runGame(plans, Display) {
    const MAX_VITA = 5;
    let vite = MAX_VITA;
    for (let level = 0; level < plans.length;) {
        let stampaVite="";
        for (let i=0; i<vite; i++){
            stampaVite+="<3 ";
        }
        console.log("Life: "+stampaVite);
        let status = await runLevel(new Level(plans[level]),Display);
        if (status == "won") {
            level++;
        } else {
            vite--;
            if (vite<=0){
                console.log("You've lost :(");
                level=0;
                vite=MAX_VITA;
            }
        }
    }
    console.log("You've won!");
}

runGame(GAME_LEVELS, DOMDisplay);
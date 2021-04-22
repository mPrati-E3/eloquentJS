function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            //console.log(`Done in ${turn} turns`);
            return turn;
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        //console.log(`Moved to ${action.direction}`);
    }
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function compareRobots(robot1, robot2, state){
    let s1=0;
    let s2=0;
    for (let i=0; i<100; i++){
        s1 += runRobot(state, robot1);
        s2 += runRobot(state, robot2);
    }
    return `Confronto: Robot1=${s1/100} Robot2=${s2/100}`;
}

export {runRobot, randomPick, compareRobots};
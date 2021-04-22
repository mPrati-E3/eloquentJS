import {randomPick} from "./mainFunctions.mjs";
import {roadGraph} from "./graphBuilder.mjs";

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}
export {randomRobot};

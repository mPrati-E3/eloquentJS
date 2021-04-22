import {VillageState} from "./state.mjs";
import {randomRobot} from "./robot1.mjs";
import {goalOrientedRobot} from "./robot2.mjs";
import {compareRobots,runRobot} from "./mainFunctions.mjs";


runRobot(VillageState.random(), randomRobot);

runRobot(VillageState.random(), goalOrientedRobot);

console.log(compareRobots(randomRobot,goalOrientedRobot,VillageState.random()));
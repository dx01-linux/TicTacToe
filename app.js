import { PubSub } from "./modules/pubSub.js";
import { Player } from "./modules/player.js";
import { Board } from "./modules/board.js";


const pubSub = PubSub() ;

const board = Board(pubSub);
const playerOne = Player('x' , pubSub);
const playerTwo = Player('o' , pubSub); 
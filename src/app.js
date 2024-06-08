import {PubSub} from './pubSub';
import {Board} from './board/board';
import {Player} from './player';


//game objects

window.pubSub = PubSub();
window.board = Board(pubSub);
window.playerOne = Player('x' , pubSub);
window.playerTwo = Player('o' , pubSub);


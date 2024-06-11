import Board from "./board.mjs";
import PubSub from "./pubSub.mjs";
import { havePatterns } from "./board.mjs";



const pubSub = PubSub () ; 

window.board = Board(pubSub) ;

let case1 = havePatterns({
    A : ["a1"] ,
    B : ["b1"],
    C : ["c1"] ,
})

let case2 = havePatterns({
    A : ["a2"],
    B : ['b1' , "b2" ],
    C : ['c2'],
})

console.log(`${case1} , ${case2}`);
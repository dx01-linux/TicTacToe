
import { check } from "./checkWinner";
import { GameData } from "./gameData";
import { Title } from "./title";


let isWinner = check();

let gameData = GameData();

let board = {
    A: [Title('a0'), Title('a1'), Title('a2')],
    B: [Title('b0'), Title('b1'), Title('b2')],
    C: [Title('c0'), Title('c1'), Title('c2')],
}

let events = {
    requestTitle: (playerSing) => `request_title_${playerSing}`,
    reqTitleResponse: (playerSing) => `request_title_resp_${playerSing}`,
    reqTitlesOwned: (playerSing) => `submit_titles_owned_${playerSing}`,
    reset: () => `reset`,
}


//on player's request for a title , it give them one if it's their turn 
let playTurn = (obj) => {
    switch (true) {
        //x turn
        case gameData.getTurn() == 1 && obj.Owner == 'x':
            setTitle(obj);
            gameData.setTurn();
            break;
        //o turn 
        case gameData.getTurn() == 2 && obj.Owner == 'o':
            setTitle(obj);
            gameData.setTurn();
            break;
        default:
            console.log('not your turn');
            break;
    }
};
//set a title for a player
let setTitle = (obj = { Group: 'A', Pos: 0, Owner: 'x' }) => {
    //acceder board.group.pos.setOwner(sign)
    let group = {};
    group = board[obj.Group];
    let title = group[obj.Pos];

    let resp = title.setOwner(obj.Owner);
    //if resp is false title is owned 
    if (resp == false) {
        console.log(`${title.getPos()} is owned by ${title.getOwner()}`);
        //it is owned by someone error
        pubSub.publish(events.reqTitleResponse(obj.Owner), { resp: false, pos: title.getPos() });
    }
    else if (resp == true) {
        console.log(`${title.getPos()} was take by ${title.getOwner()}`);
        //it was took successfully
        pubSub.publish(events.reqTitleResponse(obj.Owner), { resp: true, pos: title.getPos() });
    }
}
//reset titles
let resetTitles = () => {
    let keys = Object.keys(board);
    keys.forEach(key => {
        board[key].forEach(title => {
            title.reset();
        })
    })
}
//do what must be done after winner is found
let winner = (sign) => {
    //console.log winner
    console.log(`${sign} won round`);
    //set winner at game data , print result
    gameData.setWinner(sign);
    gameData.getData()
    //increase round
    gameData.setRound();
    //reset board
    resetTitles();
    //reset players
    pubSub.emit(events.reset());
}
//init pub sub events
let init = () => {
    //check if player wants own a title & if it is winner after take it
    pubSub.subscribe(events.requestTitle('x'), playTurn);
    pubSub.subscribe(events.requestTitle('o'), playTurn);

    //check winner x & do what must be done 
    pubSub.subscribe(events.reqTitlesOwned('x'), function (obj) {
        if (isWinner.check(obj) == true) {
            winner('x');
        }
    })
    ////check winner o & do what must be done 
    pubSub.subscribe(events.reqTitlesOwned('o'), function (obj) {
        if (isWinner.check(obj) == true) {
            winner('o');
        }
    })
}

function Board() {

    init();

    return {
        playTurn , setTitle , resetTitles , winner ,
    }
}

export {
    Board ,
}
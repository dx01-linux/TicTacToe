let round = 1;
let turn = 1;
let data = {
    x: 0,
    o: 0,
    draw: 0,
}
//increase winner points
let setWinner = (player = 'draw') => {
    data[player] += 1;
};
//increase Round
let setRound = () => {
    round++
};
//increase Turn
let setTurn = () => {
    turn++;
    if (turn == 3) {
        turn = 1;
    }

}
//get Turn
let getTurn = () => turn;
//reset data to 0
let reset = () => {
    //reset round
    round = 1;
    //reset data values to default
    let keys = Object.keys(data);
    keys.forEach(key => {
        data[key] = 0;
    });
};

let getData = () => {
    console.log(`Results : Round#${round}`);
    console.log(`x : ${data.x} , o : ${data.o} , draws : ${data.draw}`);
    return data;
}


function GameData() {
    return {
        setWinner,
        setRound,
        setTurn,
        getTurn,
        reset,
        getData,
    }
}


export {
    GameData,
}


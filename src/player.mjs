function Titles(){
    let board = {
        A: [],
        B: [],
        C: [],
    };

    function sortingGroup(Group) {
        let group = board[Group];
        let holder = '';
        for (let e = 0; e < group.length; e++) {
            for (let i = 0; i < group.length; i++) {
                let pos = (arrPos) => (group[arrPos].split(''))[1];
                //current new value < current value on spot 
                if (pos(e) < pos(i)) {
                    //hold old value
                    holder = group[i];
                    // swamp them
                    group[i] = group[e];
                    group[e] = holder;
                }
            }
        }
    }
    //storage new titles owned by player & sort them
    function setTitle(Pos) {
        //storage pos into board group
        let group = Pos[0].toUpperCase();
        board[group].push((Pos[0] + Pos[1]));
        //sort board[group]
        if (board[group].length > 1) {
            sortingGroup(group);
        }
    }
    //return board
    function getTitles() {
        return board;
    }
    //clean player board
    function reset() {
        let keys = Object.keys(board);
        keys.forEach(key => {
            board[key] = [];
        });
    }


    return {
        setTitle , getTitles , reset
    }
}

function Player(Sign){
    let board = Titles();
    let sign = Sign;

    function getSign() {
        return sign ;
    }
    return {
        getSign ,
        setTitle : board.setTitle ,
        getTitles : board.getTitles ,
        reset : board.reset ,
    }
}

/*
    player only storage titles owned by player 
*/
export default Player
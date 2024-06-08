class Titles {
    constructor() {
        this._board = {
            A: [],
            B: [],
            C: [],
        };
    }

    //sort each group
    sortingGroup(Group) {
        let group = this._board[Group];
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
    setTitle(Pos) {
        //break response into pos[0] = group && pos[1] = #
        let pos = Pos.split('');
        //storage pos into board group
        let group = pos[0].toUpperCase();
        this._board[group].push((pos[0] + pos[1]));
        //sort board[group]
        if (this._board[group].length > 1) {
            this.sortingGroup(group);
        }
    }
    //return board
    getTitles() {
        return this._board;
    }
    //clean player board
    reset() {
        let keys = Object.keys(this._board);
        keys.forEach(key => {
            this._board[key] = [];
        });
    }

}

class Player {
    constructor(sign) {
        //set variables
        this._board = new Titles();
        this._sign = sign;
        //init subscribe events
    }

    setTitle(pos) {
        this._board.setTitle(pos);
    }
    getTitle(){
        return this._board ;
    }

}

export default Player
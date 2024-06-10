import Player from "./player";

function havePatterns(obj) {
    let testHorizontalPattern = (obj) => {
        //run test ower own horizontal pos
        let horizontal = (obj, pos) => {
            let hasValue = [];
            let hasPattern = 0;
            let getValue = ['a', 'b', 'c'].map(value => (value + pos));

            let counter = 0;
            let keys = Object.keys(obj);
            keys.forEach(key => {
                if (getValue[counter] == obj[key][pos]) {
                    hasValue.push(true);
                } else {
                    hasValue.push(false);
                }
                counter += 1;
            });

            hasValue.forEach(value => {
                if (value == true) {
                    hasPattern += 1;
                }
            });

            if (hasPattern == 3) {
                return true;
            } else {
                return false;
            }
        }

        if (horizontal(obj, 0) == true || horizontal(obj, 1) == true || horizontal(obj, 2) == true) {
            return true;
        } else {
            return false;
        }
    }
    //run test over one vertical group
    let testVerticalsPatterns = (obj) => {
        //test one vertical group
        let vertical = (obj, group) => {
            let hasValue = [];
            let hasPattern = false;
            let getValue = [0, 1, 2].map(value => (group.toLowerCase()) + value);

            let counter = 0;
            getValue.forEach(value => {
                if (value == obj[group][counter]) {
                    hasValue.push(true);
                } else {
                    hasValue.push(false);
                }
                counter += 1;
            });

            hasValue.forEach(value => {
                if (value == false) {
                    hasPattern = false;
                    return;
                }

                hasPattern = true;
            });
            return hasPattern;
        }

        if (vertical(obj, 'A') == true || vertical(obj, 'B') == true || vertical(obj, 'C') == true) {
            return true;
        } else {
            return false;
        }

    }
    // run test over the two cross patterns
    let testCrossPatterns = (obj) => {
        // let crossA = ['a0' , 'b1' , 'c2'];
        let crossA = {
            A: 'a0',
            B: 'b1',
            C: 'c2',
        }
        let crossB = {
            A: 'a2',
            B: 'b1',
            C: 'c0',
        }

        //compare patter crossA & crossB against incoming Object
        let check = (obj, patt) => {
            let hasPattern = 0;
            let keys = Object.keys(obj);
            keys.forEach(key => {
                obj[key].forEach(value => {
                    if (value == patt[key]) {
                        hasPattern += 1;
                    }
                })
            })
            if (hasPattern == 3) {
                return true;
            } else {
                return false;
            }
        }

        if (check(obj, crossA) == true || check(obj, crossB) == true) {
            return true;
        } else {
            return false;
        }

    }

    let check = (obj) => {
        switch(true){
            case obj == undefined :
                console.log(`pattern can't be performed over an undefined object`);
                return false ;
                break ;
            default :
                if (testHorizontalPattern(obj) == true || testVerticalsPatterns(obj) == true || testCrossPatterns(obj) == true) {
                    return true;
                }   
                break ;
        }
    }

    return check(obj);
}
function Title(Pos) {
    let element = document.querySelector(`#${Pos}`);
    let pos = Pos;
    let isOwn = false;
    let owner = '';

    function getPos() {
        return pos;
    }
    function getIsOwn() {
        return isOwn;
    }
    function getOwner() {
        return owner;
    }
    function setIsOwn(boolean) {
        isOwn = boolean;
    }
    function setOwner(owner) {
        owner = owner;
    }

    //reset title values to default
    function reset() {
        owner = '';
        isOwn = false;
        element.innerHTML = '' ;
    }
    function renderOwnerSing(owner) {
        let component = (className) => {
            return `<i class="${className}"></i>`;
        };

        if (owner == 'x') {
            element.innerHTML = component('fa-solid fa-x');
        } else if (owner == 'o') {
            element.innerHTML = component("fa-solid fa-circle");
        }
    }

    return {
        getPos, getOwner, getIsOwn, setIsOwn, setOwner, reset, renderOwnerSing
    }
}
function GD() {
    let round = 1;
    let turn = 1;

    let data = {
        x: 0,
        o: 0,
        draw: 0,
    };

    function getTurn() {
        return turn;
    }
    function getRound(){
        return round ;
    }
    function setTurn() {
        turn += 1 ;
        if(turn == 3){
            turn = 1 ;
            round += 1 ;
        }
    }
    function setRound() {
        round++;
    }
    function reset() {
        turn = 1 ;
        round = 1;
        data.x = 0;
        data.o = 0;
        data.draw = 0;
    }
    function setWinner(name = 'draw') {
        //determinate winner
        switch (name) {
            case 'x':
                data.x += 1;

                break;
            case 'o':
                data.o += 1;

                break;
            case 'draw':
                data.draw += 1;
                break;
        }
        //render Update
        renderUpdate(name);
        //reset round 
        round = 1;
        //reset turn 
        turn = 1;
    }
    function renderUpdate(Winner) {
        let winner = document.querySelector(`#${Winner}`);
        winner.innerText = `${Winner} : ${data[Winner]}`;
    }

    return {
        reset, setWinner, getTurn, setTurn, getRound ,
    } 
}

function Board() {
    let board = {
        A: [Title('a0'), Title('a1'), Title('a2')],
        B: [Title('b0'), Title('b1'), Title('b2')],
        C: [Title('c0'), Title('c1'), Title('c2')],
    };
    let players = {
        x : Player('x') ,
        o : Player('o') ,
    }
    let gameData = GD();

 
    function reset() {
        //get board.A , .B , .C
        let groups = Object.keys(board);
        //call reset for each title inside them
        groups.forEach(group => {
            board[group].forEach(title => {
                title.reset();
            })
        })
    }
    function setTitleOwner(group, pos, owner ) {
        let title = board[group][pos];
        //titles is not owned by someone else
        if (title.getIsOwn() == false) {
            //set title to owned
            title.setIsOwn(true);
            //set owner
            title.setOwner(owner);
            //render owner sing 
            title.renderOwnerSing(owner);
            //title was successfully owned
            players[owner].setTitle(title.getPos());

            return true;
        } else {
            //title could not be owned
            return false;
        }
    }
    
    function play(){
        let board = document.querySelector('#board');
        board.addEventListener('click' , eve => {
            let target = eve.target;
            if(target.classList.contains('board__title')){
                if(gameData.getTurn() == 1){
                    //check if player can own title
                    if(setTitleOwner(target.id[0].toUpperCase() , target.id[1] , 'x' )){
                        //won 
                        if(havePatterns(players.x.getTitles()) == true){
                            gameData.setWinner('x');
                            players.x.reset();
                            players.o.reset();
                            reset()
                            
                        } else {
                            if(gameData.getRound() == 5 ){
                                gameData.setWinner('draw');
                                players.x.reset();
                                players.o.reset();
                                reset()
                            }
                            else{
                                gameData.setTurn();
                            }
                        }
                    }
                } 
                else if (gameData.getTurn() == 2){
                    //check if player can own title
                    if(setTitleOwner(target.id[0].toUpperCase() , target.id[1] , 'o' )){
                        //won 
                        if(havePatterns(players.o.getTitles()) == true){
                            gameData.setWinner('o');
                            players.x.reset();
                            players.o.reset();
                            reset();
                        } else {
                            gameData.setTurn(); 
                        }
                    }
                }
            } 
        });
    }
    play()

    return {
        reset, setTitleOwner, players
    }
}
export default Board;
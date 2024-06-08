const IsWinner = ()=> {
    //        Board
    //      A  B  C
    // 1
    // 0
    // 2
    //run test over all horizontal pos
    let testHorizontalPattern = (obj) => {
        //run test ower own horizontal pos
        let horizontal = (obj , pos) => {
            let hasValue = [];
            let hasPattern = 0 ;
            let getValue = ['a' , 'b' , 'c'].map(value => (value+pos));
            
            let counter = 0 ;
            let keys = Object.keys(obj);
            keys.forEach(key => {
                if(getValue[counter] == obj[key][pos]){
                    hasValue.push(true);
                } else {
                    hasValue.push(false);
                }
                counter+=1;
            });
            
            hasValue.forEach(value => {
                if(value == true){
                    hasPattern += 1 ;
                }
            });

            if(hasPattern == 3){
                return true ;
            } else {
                return false ;
            } 
        }
        
        if(horizontal(obj , 0) == true || horizontal(obj , 1) == true || horizontal(obj , 2) == true ){
            return true ;
        } else {
            return false ;
        }
    }
     //run test over one vertical group
    let testVerticalsPatterns = (obj) => {
        //test one vertical group
        let vertical = (obj , group) => {
            let hasValue = [];
            let hasPattern = false ;
            let getValue = [0 , 1 , 2].map(value => (group.toLowerCase())+value);
            
            let counter = 0;
            getValue.forEach(value => {
                if(value == obj[group][counter]){
                    hasValue.push(true);    
                } else {
                    hasValue.push(false);
                }
                counter += 1 ;
            });
    
            hasValue.forEach(value => {
                if(value == false){
                    hasPattern = false ;
                    return ;
                }
    
                hasPattern = true;
            });
            return hasPattern;
        }

        if(vertical(obj, 'A') == true || vertical(obj, 'B') == true || vertical(obj, 'C') == true){
            return true ;
        }  else {
            return false;
        }
        
    } 
    // run test over the two cross patterns
    let testCrossPatterns = (obj) => {
        // let crossA = ['a0' , 'b1' , 'c2'];
        let crossA = {
            A : 'a0' ,
            B : 'b1' ,
            C : 'c2' ,
        }
        let crossB = {
            A : 'a2' ,
            B : 'b1' ,
            C : 'c0' ,
        }

        //compare patter crossA & crossB against incoming Object
        let check = (obj , patt) => {
            let hasPattern = 0 ;
            let keys = Object.keys(obj);
            keys.forEach(key => {
                obj[key].forEach(value  => {
                    if(value == patt[key]){
                        hasPattern += 1 ;
                    }
                })
            })
            if(hasPattern == 3){
                return true ;
            } else {
                return false ;
            }
        }

        if(check(obj , crossA) == true || check(obj , crossB) == true){
            return true ;
        } else {
            return false ;
        }
    
    }

    let check = (obj) => {
        if(typeof(obj) == undefined){
            console.log(`pattern can't be performed over an undefined object`);
        }
        else {
            if (testHorizontalPattern(obj) == true || testVerticalsPatterns(obj) == true || testCrossPatterns(obj) == true){
                return true ;
            } else {
                return false;
            }
        }
    }

    return { check }
}
const title = (Pos) => {
    //coor 
    //is ocup
    //who 
    let pos = Pos;
    let isOwn = false;
    let owner = '';

    let getPos = () => pos;
    let getIsOwn = () => isOwn;
    let setIsOnw = (setter = false) => isOwn = setter;
    let getOwner = () => owner;
    let setOwner = (sign = 'x||o') => {
        //if not owned
        if (getIsOwn() == false) {
            //turn to owned
            setIsOnw(true);
            //asign owner
            owner = sign;
            //respond it work
            return true;
        }
        else {
            //is owned , can't be owned 
            return false;
        }
    }

    //reset titles values
    let reset = () =>{
        isOwn = false ;
        owner = '' ;
    }

    return {
        setOwner, getIsOwn, getOwner, getPos , reset
    }
}
const GameData = () => {
    //game stats
    let round = 1 ;

    let data = {
        x : 0 ,
        o : 0 ,
        draw : 0 ,
    }
    //increase winner points
    let setWinner = (player= 'draw') => {
        data[player] += 1 ;
    };
    let setRound = () => {
        round++
    };
        //reset data to 0
    let reset = () => {
        //reset round
        round = 1 ;
        //reset data values to default
        let keys = Object.keys(data);
        keys.forEach(key => {
            data[key] = 0 ;
        });
    };

    let getData = () => {
        console.log(`Results : Round#${round}`);
        console.log(`x : ${data.x} , o : ${data.o} , draws : ${data.draw}`);
        return data ;
    } 

    return {
        setWinner , reset , setRound , getData 
    }

}
const Board = (pubSub) => {
    //board
    let board = {
        //0 , 1 , 2
        A: [title('a0'), title('a1'), title('a2')],
        B: [title('b0'), title('b1'), title('b2')],
        C: [title('c0'), title('c1'), title('c2')]
    }
    //game data 
    let gameData = GameData();
    //pubSub events
    let events = {
        requestTitle : (playerSing)=> `request_title_${playerSing}`,
        reqTitleResponse : (playerSing) => `request_title_resp_${playerSing}`,
        reqTitlesOwned : (playerSing) => `submit_titles_owned_${playerSing}`,
        reset : (playerSign) => {`reset_${playerSign}`},
    }
    //module to check winner patterns
    let isWinner = IsWinner();
    //set a title to a player 
    let setTitle = (obj = { Group: '', Pos: 0, Owner: '' }) => {
        //acceder board.group.pos.setOwner(sign)
        let group = {};
        group = board[obj.Group];
        let title = group[obj.Pos];

        let resp = title.setOwner(obj.Owner);
        //if resp is false title is owned 
        if (resp == false) {
            console.log(`${title.getPos()} is owned by ${title.getOwner()}`);
            //it is owned by someone error
            pubSub.publish(events.reqTitleResponse(obj.Owner), {resp: false, pos: title.getPos()});
        }
        else if (resp == true) {
            console.log(`${title.getPos()} was take by ${title.getOwner()}`);
            //it was took successfully
            pubSub.publish(events.reqTitleResponse(obj.Owner), {resp: true, pos: title.getPos()});
        }
    }
    //reset titles
    let resetTitles = () => {
        let keys = Object.keys(board);
        keys.forEach(key=>{
            key.forEach(title=>{
                title.reset();
            })
        })
    } 

    //init pub sub events
    let init = () => {
        //check if player wants own a title & if it is winner after take it
        pubSub.subscribe(events.requestTitle('x'), setTitle);
        pubSub.subscribe(events.requestTitle('o'), setTitle);

        //check winner x
        pubSub.subscribe(events.reqTitlesOwned('x') , function(obj){
            if(isWinner.check(obj) == true){
                //console.log winner
                console.log('x won round');
                //set winner at game data , print result
                gameData.setWinner('x');
                gameData.getData()
                //increase round
                gameData.setRound();
                //reset board
                resetTitles();
                //reset players
                pubSub.emit(events.reset('x'));
                pubSub.emit(events.reset('o'));
                
                

            }
        })
        //check winner o
        pubSub.subscribe(events.reqTitlesOwned('o') , function(obj){
            if(isWinner.check(obj) == true){
                console.log('o won round');
                gameData.setWinner('o');
                gameData.getData()
                //increase round
                gameData.setRound();
                //reset board
                resetTitles();
                //reset players
                pubSub.emit(events.reset('x'));
                pubSub.emit(events.reset('o'));

            }
        })
    }

    
    init();

    return {
        isWinner : isWinner.check , setTitle
    }

};


export {
    Board ,
}
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

    return {
        setOwner, getIsOwn, getOwner, getPos
    }
}
const Board = (pubSub) => {
    //titles
    let board = {
        //0 , 1 , 2
        A: [title('a0'), title('a1'), title('a2')],
        B: [title('b0'), title('b1'), title('b2')],
        C: [title('c0'), title('c1'), title('c2')]
    }
    let events = {
        reqTitlesOwned : (playerSing) => `submit_titles_owned${sign}`,
        requestTitle : (playerSing)=> `request_title${playerSing}`,
        reqTitleResponse : (playerSing) => `request_title_resp${playerSing}`,
    }
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
            pubSub.publish( events.reqTitleResponse(obj.Owner), { resp: false, pos: title.getPos() });
        }
        else if (resp == true) {
            console.log(`${title.getPos()} was take by ${title.getOwner()}`);

            //it was took successfully
            pubSub.publish(events.reqTitleResponse(obj.Owner), { resp: true, pos: title.getPos() })
           
        }
    }

    let init = () => {
        //check if player wants own a title & if it is winner after take it
        pubSub.subscribe(events.requestTitle('x'), setTitle);
        pubSub.subscribe(events.requestTitle('o'), setTitle);
    }

    
    init();

    return {
        isWinner : isWinner.check , setTitle
    }

};

function test() {
    //vertical patterns 
    //horizontal
    //cross
    const vObj = {
        A: ['a1'],
        B: [],
        C: ['c0', 'c1', 'c2']
    }
    const hObj = {
        A: ['a0'],
        B: ['b0'],
        C: ['c0']
    }
    const crossObj = {
        A: ['a0'],
        B: ['b1'],
        C: ['c2'],
    }
    const fObj = {
        A: ['a2'],
        B: ['b0'],
        C: ['c0'],
    }

    console.log(Board.isWinner(vObj));
}


export {
    Board ,
}

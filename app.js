// board
// -check for win conditions after players players
// -titles to record player Selection

const PubSub = ( () => {
    let events = {} ;

    let subscribe = (eve , fn) => {
        //event[eve] does not exist
        if(events[eve] == undefined){
            events[eve] = [];
        }
        events[eve].push(fn)
    }
    let publish = (eve , data) => {
        events[eve].forEach(fn => {
            fn(data);
        });
    }

    return {
        publish , subscribe ,
    }
})
const pubSub = PubSub();

const OwnedTitles = (()=>{
    //storage owned titles by group
    let board = {
        A : [] ,
        B : [] ,
        C : [] ,
    }
    let sortingGroup = (Group = '') => {
        let group = [];
        group = board[Group];

        let holder = '';
        for(let e = 0 ; e < group.length ; e++){
            for(let i = 0 ; i < group.length ; i++){
                let pos = (arrPos) => (group[arrPos].split(''))[1];
                //current new value < current value on spot 
                if(pos(e) < pos(i)){
                    //hold old value
                    holder = group[i];
                    // swamp them
                    group[i] = group[e];
                    group[e] = holder;
                }
            }
        }
    }
    let setTitle = (Pos = '') => {
        //break response into pos[0] = group && pos[1] = #
        let pos = Pos.split('');
        //storage pos into board group
        let group = pos[0].toUpperCase();
        board[group].push((pos[0]+pos[1]));
        //sort board[group]
        if(board[group].length > 1){
            sortingGroup(group);
        }
    }
    let getOwnedTitles = (group) => board[group] ;

    return {
        getOwnedTitles , setTitle ,
    }
});

let player = ((Sign)=>{
    //storage player sign
    //storage data about player's owned titles
    let sign = Sign ;
    let ownedTitles = OwnedTitles();

    let setOwnedTitel = (obj = {resp , pos}) => {
        let resp = obj.resp ;
        let pos = obj.pos ;
        if(resp == true){
            ownedTitles.setTitle(pos);
        }
    }

    let owningTitle = (obj = {Group : 'A' , Pos  :  0}) => {
        obj.Owner = sign ;
        pubSub.publish(`take_title${sign}` , obj);
    }

    let init = () => {
        //subscribe to take_title_resp[playerName]
        pubSub.subscribe(`take_title_resp${sign}` , setOwnedTitel );
    }
    init();

    //testing purpose
    return{
        owningTitle , getOwnedTitles : ownedTitles.getOwnedTitles() ,
    }

});

let title = (Pos) => {
    //coor 
    //is ocup
    //who 
    let pos = Pos;
    let isOwn = false ;
    let owner = '' ;

    let getPos = () => pos ;
    let getIsOwn = () => isOwn;
    let setIsOnw = (setter = false) => isOwn = setter ;
    let getOwner = () => owner ;
    let setOwner = (sign = 'x||o') => {
        //if not owned
        if(getIsOwn() == false){
            //turn to owned
            setIsOnw(true);
            //asign owner
            owner = sign;
            //respond it work
            return true ;
        }
        else {
            //is owned , can't be owned 
            return  false ;
        }
    }

    
    return {
        setOwner ,  getIsOwn ,  getOwner , getPos
    }
}
const Board = (()=>{
    //title
    let board =  {
        //0 , 1 , 2
        A : [title('a0') , title('a1') , title('a2') ],
        B : [title('b0') , title('b1') , title('b2') ],
        C : [title('c0') , title('c1') , title('c2') ]
    }
    
    //set a title to a player 
    let setTitle = (obj = {Group : 'A' , Pos  :  0 , Owner : 'x'}) => {
        //acceder board.group.pos.setOwner(sign)
        let group  = {} ;
        group = board[obj.Group];
        let title = group[obj.Pos] ;

        let resp = title.setOwner(obj.Owner);
        //if resp is false title is owned 
        if(resp == false){
            console.log(`${title.getPos()} is owned by ${title.getOwner()}`);
            //it is owned by someone err
            pubSub.publish(`take_title_resp${obj.Owner}` , {resp:false , pos : title.getPos()})
        }
        else if(resp == true) {
            console.log(`${title.getPos()} was take by ${title.getOwner()}`);
            //it was took successfully
            pubSub.publish(`take_title_resp${obj.Owner}` , {resp:true, pos : title.getPos()})
        }   
    }

    let isWinner = (obj) => {
        //compare player owned titles with winner patrons 
        let pattrons = {
             
        }
    }

    let init = () => {
        //check if player wants own a title & if it is winner after take it
        pubSub.subscribe('take_titlex' , setTitle);   
        pubSub.subscribe('take_titleo' , setTitle);
        
        
    }

    init();
});




const playerOne = player('x');
const playerTwo = player('o');
const board = Board() ;

const ownedTitles = OwnedTitles();
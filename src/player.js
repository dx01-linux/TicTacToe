
const titles = ()=>{
    //storage owned titles by group
    let board = {
        A: [],
        B: [],
        C: [],
    }
    let sortingGroup = (Group = '') => {
        let group = [];
        group = board[Group];

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
    let setTitle = (Pos = '') => {
        //break response into pos[0] = group && pos[1] = #
        let pos = Pos.split('');
        //storage pos into board group
        let group = pos[0].toUpperCase();
        board[group].push((pos[0] + pos[1]));
        //sort board[group]
        if (board[group].length > 1) {
            sortingGroup(group);
        }
    }
    let getTitles = () => board;
    
    let reset = () => {
        let keys = Object.keys(board);
        keys.forEach(key =>{
            board[key] = [];
        })
    }
    return {
        getTitles ,  setTitle, reset ,
    }
};

const Player = (Sign , pubSub) => {
    //storage player sign
    //storage data about player's owned titles
    let sign = Sign;
    let playerTitles = titles();

    //pubSub events
    let events = {
        requestTitle: `request_title_${sign}` ,
        reqTitleResponse : `request_title_resp_${sign}` ,
        reqTitlesOwned: `submit_titles_owned_${sign}`,
        reset : `reset_${sign}` ,
    }
    
    //trigger on Board response to requestTitle , if resp is true , add position to player titles
    let setTitel = (obj = { resp, pos }) => {
        let resp = obj.resp;
        let pos = obj.pos;
        if (resp == true) {
            playerTitles.setTitle(pos);
        }

        //send back titles to check if player won
        pubSub.publish(events.reqTitlesOwned , playerTitles.getTitles());
    }

    //request a title to board via PubSub
    let requestTitle= (Group = 'A' , Pos = 0 ) => {
        const obj = {
            Group , 
            Pos , 
            Owner : sign ,
        } 
        
        pubSub.publish(events.requestTitle, obj);
    }

    //init pubSub events
    let init = () => {
        //subscribe to resp from board when request title ask for a title
        pubSub.subscribe(events.reqTitleResponse , setTitel);
        pubSub.subscribe(events.reset , reset )
    }
    
    init();

    //testing purpose
    return {
        setTitel , requestTitle , getTitles : playerTitles.getTitles ,
    }

};

const testPlayer = {
    reqTitle : function(player){
        let values  = [
            testValuesA = [{Group : 'A' , Pos : 0 } , {Group : 'A' , Pos : 2 } , {Group : 'A' , Pos : 1 }] ,
            testValuesB = [{Group : 'B' , Pos : 1 } , {Group : 'A' , Pos : 0 } , {Group : 'A' , Pos : 2 }] ,
            testValuesC = [{Group : 'A' , Pos : 0 } , {Group : 'A' , Pos : 1 } , {Group : 'A' , Pos : 2 }] ,
        ]

        [0 , 1 , 2].forEach(test => {
            console.log('test#'+test);
            [0 , 1 ,2 ].forEach(pos => {
                let testV = values[test[pos]];
                player.requestTitle(testV);
            })
            console.log('test#'+test+' '+'End');
        })
    }
}

export {
    Player ,
}
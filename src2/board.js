function isWinner(obj){
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

    return check(obj) ;
}

class Title {
    constructor(Pos){
        this._pos = Pos ;
        this._isOwn = false;
        this._owner = '';
        this._element = document.querySelector(`#${Pos}`);
    }
            //getters & setters

    getPos(){
        return this._pos ;
    }
    getIsOwn(){
        return this._isOwn ;
    }
    getOwner(){
        return this._owner ;
    }
    setIsOwn(boolean){
        this._isOwn = boolean ;
    }
    setOwner(owner){
        this._owner = owner ;
    }
            // methods

    //reset title values to default
    reset(){
        this._owner = '';
        this._isOwn = false;
    }
    renderOwnerSing(owner){
        let component = (className) => {
            return `<i class="${className}"></i>`;
        };

        if(owner == 'x'){
            this._element.innerHTML = component('fa-solid fa-x');
        } else if (owner == 'o'){
            this._element.innerHTML = component("fa-solid fa-circle");
        }
    }
    
}
class GD{
    constructor(){
        this.round = 1 ;
        this.data = {
            x : 0 ,
            o : 0 ,
            draw : 0 ,
        }
    }

    reset(){
        this.round = 1 ;
        this.data.x = 0 ;
        this.data.o = 0 ;
        this.data.draw = 0;
    }
    setWinner(name = 'draw'){
        switch (name) {
            case 'x' :
                this.data.x += 1;
               
            break;
            case 'o' :
                this.data.o += 1 ;
               
            break;
            case 'draw' :
                this.data.draw += 1;
            break ;
        }
        this.renderUpdate(name);
    }
    renderUpdate(Winner){
        let winner = document.querySelector(`#${Winner}`);
        winner.innerText = `${Winner} : ${this.data[Winner]}`;
    }

}
class Board {
    constructor(){
        //set variables
                                //board
        this._board = {
            A : [new Title('a0') , new Title('a1') , new Title('a2')] ,
            B : [new Title('b0') , new Title('b1') , new Title('b2')] ,
            C : [new Title('c0') , new Title('c1') , new Title('c2')] ,
        };
                            //game data
        this.gameData = new GD ;
        //init subscribe events
        
    }

    //reset all titles
    reset(){
        //get board.A , .B , .C
        let groups = Object.keys(this._board);
        //call reset for each title inside them
        groups.forEach(group => {
            this._board[group].forEach(title => {
                title.reset();
            })
        })
    }
    //set a owner for a title , true for success & false for not success
    setTitleOwner(obj = {Group , Pos , Owner}){
        let pos = obj.Pos ;
        let group = obj.Group ;
        let owner = obj.Owner ;
        let title = this._board[group][pos] ;
        //titles is not owned by someone else
        if(title.getIsOwn() == false){
            //set title to owned
            title.setIsOwn(true);
            //set owner
            title.setOwner(owner);
            //render owner sing 
            title.renderOwnerSing(owner);
            //title was successfully owned
            return true ;
        } else {
            //title could not be owned
            return false ;
        }
    }
    

}


export default Board ;
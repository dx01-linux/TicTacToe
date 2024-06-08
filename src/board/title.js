


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
        //render owner sign
        renderOwnerSign();
        //respond it work
        return true;
    }
    else {
        //is owned , can't be owned 
        return false;
    }
}
let renderOwnerSign = () => {
    let component = (classname) => `<i class = '${classname}'></i>`;
    if (getOwner() == 'x') {
        HtmlElement.innerHTML = component("fa-solid fa-x");
    }
    else if (getOwner() == 'o') {
        HtmlElement.innerHTML = ("fa-regular fa-circle");
    } 
}
//reset titles values
let reset = () => {
    isOwn = false;
    owner = '';
    HtmlElement.innerText = '';
}


function Title(Pos){
    let HtmlElement = document.querySelector(`#${pos}`);
    let pos = Pos;
    let isOwn = false;
    let owner = '';
    
    return {
        getPos , 
        getIsOwn ,
        getOwner ,
        setOwner ,
        reset ,
    }
}

export {
   Title ,
}
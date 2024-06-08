const PubSub = () => {
    let events = {};

    let subscribe = (eve, fn) => {
        //event[eve] does not exist
        if (events[eve] == undefined) {
            events[eve] = [];
        }
        events[eve].push(fn)
    }
    let publish = (eve, data) => {
        
        switch(events[eve]){
            //event is undefine
            case events[eve] == undefined :
                console.log(` PubSub : ${eve}  does not exsist`);
                break;
            //events does not have any callback
            case events[eve].lenght == 0 :
                console.log(` PubSub : ${eve} does'n have any callback-fn`);
                break;
            default :
            //run any callback inside events[eve]
                events[eve].forEach(fn=> {
                    fn(data);
                })
                break;
        }
    }

    let emit = (eve) => {
        if(events[eve] == undefined){
            console.log(`PubSub : ${eve} does not exist`);
        } else {
            events[eve].forEach(fn => {
                fn();
            })
        }
    }

    return { 
        publish, subscribe, emit , events
    }
}

export {
    PubSub ,
}
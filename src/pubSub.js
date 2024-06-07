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
        if(typeof(events[eve]) == "undefined"){
            console.log(`PubSub : ${eve} does not exist`);
        } else {
            events[eve].forEach(fn=> {
                fn(data);
            })
        }
    }

    let emit = (eve) => {
        if(typeof(events[eve]) == "undefined"){
            console.log(`PubSub : ${eve} does not exist`);
        } else {
            events[eve].forEach(fn=> {
                fn();
            })
        }
    }

    return {
        publish, subscribe, emit ,
    }
}

export {
    PubSub ,
}
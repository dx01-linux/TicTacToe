

function PubSub(){
    let events = {

    };

    //publish data to all callbacks inside certain event
    function publish(eve , data){
        switch(true) {
            case events[eve] == undefined :
                console.log(`PubSub : ${eve}  doesn't  exist`);
                break;
            case events[eve].lenght == 0 :
                console.log(`PubSub : ${eve} don't have callbacks`);
                break;
            default :
                events[eve].forEach(fn => {
                    fn(data);
                });
                break;
        }
    }
    //subscribe a callback to certain event
    function subscribe(eve , callback){
         //event[eve] does not exist
         if (events[eve] == undefined) {
            events[eve] = [];
        }
        events[eve].push(callback)
    }
    //emit a certain event
    function emit(eve){
        switch(true) {
            case events[eve] == undefined :
                console.log(`PubSub : ${eve} is undefined`);
                break;
            case events[eve].lenght == 0 :
                console.log(`PubSub : ${eve} don't have callbacks`);
                break;
            default :
                events[eve].forEach(fn => {
                    fn();
                });
                break;
        }
    }

    return {
        publish , subscribe , emit , 
    }

}
export default PubSub ;
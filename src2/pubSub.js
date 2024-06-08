class PubSub{
    constructor(){
        //storage each event and callbacks
        this._events = {}
    }

    //publish data to all callbacks inside certain event
    publish(eve , data){
        switch(true) {
            case this._events[eve] == undefined :
                console.log(`PubSub : ${eve}  doesn't  exist`);
                break;
            case this._events[eve].lenght == 0 :
                console.log(`PubSub : ${eve} don't have callbacks`);
                break;
            default :
                this._events[eve].forEach(fn => {
                    fn(data);
                });
                break;
        }
    }
    //subscribe a callback to certain event
    subscribe(eve , callback){
         //event[eve] does not exist
         if (this._events[eve] == undefined) {
            this._events[eve] = [];
        }
        this._events[eve].push(callback)
    }
    //emit a certain event
    emit(eve){
        switch(true) {
            case this._events[eve] == undefined :
                console.log(`PubSub : ${eve} is undefined`);
                break;
            case this._events[eve].lenght == 0 :
                console.log(`PubSub : ${eve} don't have callbacks`);
                break;
            default :
                this._events[eve].forEach(fn => {
                    fn();
                });
                break;
        }
    }

}

export default PubSub ;
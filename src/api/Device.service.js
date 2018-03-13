
export default class Service {
    constructor(url, accessToken) {

        this.handlers = {};
    }
    getPage = (page, count) => {
        return new Promise((resolve, reject) => {
            
        });
    }
    // Emits an event with a payload
    // 
    // @param   { String }      evtName     the event to fire
    // @param   { Object/null } payload     the payload
    // @return  { Object }      server response
    emit = (evtName, payload) => {
        const evt = {
            action: evtName,
            data: payload;
        }
        return evt;
    }
    // Attaches event handler to fire on event
    // 
    // @param   { String }      evtName     the event to listen for
    // @param   { Function }    handler     the handler to fire on event
    // @return  { null }        nothing
    // 
    on = (evtName, handler) => {
        if (this.handlers.hasOwnProperty(evtName)) {
            this.handlers[evtName].push(handler);
        } else {
            this.handlers[evtName] = [handler];
        }
    };
}
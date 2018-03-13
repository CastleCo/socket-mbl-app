
// generic websocket service w heartbeat functionality
// 
export default class Service {
    constructor(url) {
        this.alive = false;
        this.ws = null;
    }
    // sends a ping
    ping = () => {

    }
    // sends a ping and waits for a pong
    // @desc
    //      Sends a ping waits for response.
    //      If reponse, waits 100
    //      Retries after 200 ms if no response, for a total of 3 times.
    //      Refreshes websocket once, tries again.
    // 
    playBall = () => {

    }
}
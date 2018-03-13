
export default class Service {
    constructor(rootUrl) {
        this.rootUrl = rootUrl;
        this.user = null;
        this.accessToken = null;
        this.refreshToken = null;
    }

    // Logs a user into the application
    // 
    // @desc        Sends a thing to 
    // 
    // @params      String      email       the email of the user attempting login
    // @params      String      password    the password of the user attempting login
    // @returns     Promise     
    //  resolves on successful credential combination
    //  rejects on incorrect combination
    login = (email, password) => {
        console.log(`[${(new Date()).toString()}] login email=${email} password=${password}`);
        // send network request for authentication
        return new Promise((resolve, reject) => {
            // TODO: remove when out of dev
            if (email === 'admin' && password === "admin") {
                const fakeData = { user: { id: '42', email: 'admin' }, accessToken: '42' };
                console.log(fakeData);
                this.user = fakeData.user;
                this.accessToken = fakeData.accessToken;
                return resolve(fakeData);
            }
            
            fetch(`${this.rootUrl}/auth/login`, {
                method: "POST",
                body: JSON.stringify({ email, password })
            })
            .then(resp => resp.json())    
            .then(data => {
                this.user = data.user;
                this.accessToken = data.accessToken;
                resolve(data);
            })
            .catch(err => {
                console.error(err)
                reject(err);
            });
        });
    }

    // Checks whether user is logged in
    // 
    // @returns     Promise
    //  resolves if user is logged in (has authenticated access to server)
    //  rejects if user is logged out (does not have auth. access to server)
    loggedIn = () => {
        return new Promise((resolve, reject) => {
            resolve({ ok: true });
        });
    }

    // Logs the user out of the application
    // 
    // @desc        Drops the associated acess and refresh tokens
    // 
    // @returns     null
    logout = () => {
        console.log(`[${(new Date()).toString()}] logout user=${this.user.id}`);
        return new Promise((resolve, reject) => {
            this.user = null;
            this.accessToken = null;
            this.refreshToken = null;
            resolve({ ok: true });
        });
    }
    get accessToken() {
        return this.accessToken
    }
    // Logs
    // 
    register = (email, password) => {
        const now = (new Date()).toString();
        console.log(`[${now}] register email=${email} password=${password}`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ ok: true });
                // nav to main
            }, 200);
        });
    }
}
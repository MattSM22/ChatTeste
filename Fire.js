import firebase from 'firebase'

class Fire{
    constructor(){
        this.init();
        this.checkAuth();
    }

    init = () => {
        if(!firebase.apps.length){
            firebase.initializeApp({
                    apiKey: "AIzaSyClFIPu9H3L2Y1GD9l3e4iWBeS2Sq-wlpM",
                    authDomain: "testechat-d6ef9.firebaseapp.com",
                    databaseURL: "https://testechat-d6ef9.firebaseio.com",
                    projectId: "testechat-d6ef9",
                    storageBucket: "testechat-d6ef9.appspot.com",
                    messagingSenderId: "892973524077",
                    appId: "1:892973524077:web:0e966d88027cebe50dcb64",
                    measurementId: "G-Z5KSXVVZH5"
            });
        }
    };

    checkAuth = () =>{
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                firebase.auth().signInAnonymously();
            }
        });
    }
    send = messages => {
        messages.forEach(item =>{
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            }
            this.db.push(message);
        })
    }

    parse = message =>{
        const {user, text, timestamp} = message.val();
        const {key: _id} = message
        const createdAt = new Date(timestamp)

        return{
            _id,
            createdAt,
            text,
            user
        }
    }

    get = callback =>{
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)))
    }

    off(){
        this.db.off();
    }

    get db(){
        return firebase.database().ref("messages");
    }

    get uid(){
        return (firebase.auth().currentUser || {}).uid
    }
}

export default new Fire();

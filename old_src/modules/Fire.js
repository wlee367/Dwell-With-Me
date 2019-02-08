import firebase from 'firebase';
import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID
} from '../keys/dev';

class Fire {
    constructor() {
        this.init();

        this.observeAuth();
    }

    observeAuth = () =>
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    onAuthStateChanged = user => {
        if (!user) {
            try {
                // 4.
                firebase.auth().signInAnonymously();
            } catch ({ message }) {
                alert(message);
            }
        }
    };

    // 1.
    get ref() {
        return firebase.database().ref('messages');
    }
    // 2.
    on = callback =>
        this.ref
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));
    // 3.
    parse = snapshot => {
        // 1.
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        // 2.
        const timestamp = new Date(numberStamp);
        // 3.
        const message = {
            _id,
            timestamp,
            text,
            user
        };
        return message;
    };
    // 4.
    off() {
        this.ref.off();
    }

    // 1.
    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
    // 2.
    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    // 3.
    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            // 4.
            const message = {
                text,
                user,
                timestamp: this.timestamp
            };
            this.append(message);
        }
    };
    // 5.
    append = message => this.ref.push(message);

    init = () => {
        firebase.initializeApp({
            apiKey: FIREBASE_API_KEY,
            authDomain: FIREBASE_AUTH_DOMAIN,
            databaseURL: FIREBASE_DATABASE_URL,
            projectId: FIREBASE_PROJECT_ID,
            storageBucket: FIREBASE_STORAGE_BUCKET,
            messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
        });
    };
}

Fire.shared = new Fire();
export default Fire;

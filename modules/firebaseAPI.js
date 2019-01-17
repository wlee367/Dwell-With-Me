import * as firebase from 'firebase';

export const createUser = (email, password) => {
    console.log('CreateUser has been called.');

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(error => console.log('createUser error: ', error));
};

export const signInAnonymously = () => {
    firebase
        .auth()
        .signInAnonymously()
        .catch(err => {
            console.log(err.message);
        });
};

export const signInUser = (email, password) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => console.log('createUser error: ', error));
};

export const logoutUser = () => {
    firebase.auth().signOut();
};

export const userLogin = (email, password) => {
    return new Promise(resolve => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        console.warn('Invalid email address format.');
                        break;
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        console.warn('Invalid email address or password');
                        break;
                    default:
                        console.warn('Check your internet connection');
                }
                resolve(null);
            })
            .then(user => {
                if (user) {
                    resolve(user);
                }
            });
    });
};

export const createFirebaseAccount = (name, email, password) => {
    return new Promise(resolve => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(error => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        console.warn('This email address is already taken');
                        break;
                    case 'auth/invalid-email':
                        console.warn('Invalid e-mail address format');
                        break;
                    case 'auth/weak-password':
                        console.warn('Password is too weak');
                        break;
                    default:
                        console.warn('Check your internet connection');
                }
                resolve(false);
            })
            .then(info => {
                if (info) {
                    firebase.auth().currentUser.updateProfile({
                        displayName: name
                    });
                    resolve(true);
                }
            });
    });
};

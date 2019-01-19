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
            throw Error();
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
            .then(user => {
                if (user) {
                    resolve(user);
                }
            })
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

export const sendEmailWithPassword = email => {
    console.log(email);
    firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
            console.warn('Email with new password has been sent');
        })
        .catch(error => {
            switch (error.code) {
                case 'auth/invalid-email':
                    console.warn('Invalid email address format');
                    break;
                case 'auth/user-not-found':
                    console.warn('User with this email does not exist');
                    break;
                default:
                    console.warn('Check your internet connection');
            }
        });
};

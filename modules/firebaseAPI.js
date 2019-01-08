import * as firebase from 'firebase';

export const createUser = (email, password) => {
    console.log('calling createUser');
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(error => console.log(error));
};

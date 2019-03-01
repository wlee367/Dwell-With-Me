import * as types from './actionTypes';
import firebaseService from '../../services/FirebaseService';

export const generateRandomName = () => {
    let text = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

export const restoreSession = () => {
    return dispatch => {
        dispatch(sessionRestoring());

        let unsubscribe = firebaseService.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch(sessionSuccess(user));
                unsubscribe();
            } else {
                dispatch(sessionLogout());
                unsubscribe();
            }
        });
    };
};

export const loginAnonymously = () => {
    return dispatch => {
        dispatch(sessionLoading());

        firebaseService
            .auth()
            .signInAnonymously()
            .then(function() {
                user = firebaseService.auth().currentUser;
                // user.sendEmailVerification();
            })
            .then(function() {
                user.updateProfile({
                    displayName: generateRandomName()
                });
            })
            .catch(err => {
                dispatch(sessionError(err.message));
            });

        let unsubscribe = firebaseService.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch(sessionSuccess(user));
                unsubscribe();
            }
        });
    };
};

export const loginUser = (email, password) => {
    return dispatch => {
        dispatch(sessionLoading());

        firebaseService
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => {
                dispatch(sessionError(error.message));
            });

        let unsubscribe = firebaseService.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch(sessionSuccess(user));
                unsubscribe();
            }
        });
    };
};

export const signupUser = (email, password, name) => {
    return dispatch => {
        dispatch(sessionLoading());

        firebaseService
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function() {
                user = firebaseService.auth().currentUser;
                // user.sendEmailVerification();
            })
            .then(function() {
                user.updateProfile({
                    displayName: name
                });
            })
            .catch(error => {
                dispatch(sessionError(error.message));
            });

        let unsubscribe = firebaseService.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch(sessionSuccess(user));
                unsubscribe();
            }
        });
    };
};

export const logoutUser = () => {
    return dispatch => {
        dispatch(sessionLoading());

        firebaseService
            .auth()
            .signOut()
            .then(() => {
                dispatch(sessionLogout());
            })
            .catch(error => {
                dispatch(sessionError(error.message));
            });
    };
};

const sessionRestoring = () => ({
    type: types.SESSION_RESTORING
});

const sessionLoading = () => ({
    type: types.SESSION_LOADING
});

const sessionSuccess = user => ({
    type: types.SESSION_SUCCESS,
    user
});

const sessionError = error => ({
    type: types.SESSION_ERROR,
    error
});

const sessionLogout = () => ({
    type: types.SESSION_LOGOUT
});

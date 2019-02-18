import * as firebaseService from '../../services/FirebaseService';

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

export const signupUser = (email, password) => {
    return dispatch => {
        dispatch(sessionLoading());

        firebaseService
            .auth()
            .createUserWithEmailAndPassword(email, password)
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

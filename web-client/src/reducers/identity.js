const identityReducer = (state = {authData: null}, action) => {
    switch(action.type) {
        case 'AUTHENTICATION':
            return {...state, authData: action.data, errors: null};
        case 'LOGOUT':
            localStorage.clear();
            return { ...state, authData: null, errors: null };
        default:
            return state;
    }
}

export default identityReducer;
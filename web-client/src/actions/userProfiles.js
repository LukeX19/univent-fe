import * as api from '../api/index';

export const getAllUserProfilesAction = () => async (dispatch) => {
    try {
        const { data } = await api.getAllUserProfiles();
        dispatch({ type: 'GET_ALL_USER_PROFILES', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const getUserProfileAction = (id) => async (dispatch) => {
    try {
        const { data } = await api.getUserProfileById(id);
        dispatch({ type: 'GET_USER_PROFILE', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const updateUserProfileAction = (id, formData) => async (dispatch) => {
    try {
        const { data } = await api.updateUserProfile(id, formData);
        dispatch({ type: 'UPDATE_USER_PROFILE', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const deleteUserProfileAction = (id) => async (dispatch) => {
    try {
        await api.deleteUserProfile(id);
        dispatch({ type: 'DELETE_USER_PROFILE', payload: id });
    } catch(error) {
        console.log(error);
    }
}
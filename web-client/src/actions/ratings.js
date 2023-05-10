import * as api from '../api/index';

export const getAllRatingsAction = () => async (dispatch) => {
    try {
        const { data } = await api.getAllRatings();
        dispatch({ type: 'GET_ALL_RATINGS', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const getRatingAction = (id) => async (dispatch) => {
    try {
        const { data } = await api.getRatingById(id);
        dispatch({ type: 'GET_RATING', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const addRatingAction = (formData) => async (dispatch) => {
    try {
        const { data } = await api.addRating(formData);
        dispatch({ type: 'ADD_RATING', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const deleteRatingAction = (id) => async (dispatch) => {
    try {
        await api.deleteRating(id);
        dispatch({ type: 'DELETE_RATING', payload: id });
    } catch(error) {
        console.log(error);
    }
}
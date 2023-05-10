import * as api from '../api/index';

export const getAllUniversitiesAction = () => async (dispatch) => {
    try {
        const { data } = await api.getAllUniversities();
        dispatch({ type: 'GET_ALL_UNIVERSITIES', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const getUniversityAction = (id) => async (dispatch) => {
    try {
        const { data } = await api.getUniversityById(id);
        dispatch({ type: 'GET_UNIVERSITY', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const addUniversityAction = (formData) => async (dispatch) => {
    try {
        const { data } = await api.addUniversity(formData);
        dispatch({ type: 'ADD_UNIVERSITY', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const updateUniversityAction = (id, formData) => async (dispatch) => {
    try {
        const { data } = await api.updateUniversity(id, formData);
        dispatch({ type: 'UPDATE_UNIVERSITY', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const deleteUniversityAction = (id) => async (dispatch) => {
    try {
        await api.deleteUniversity(id);
        dispatch({ type: 'DELETE_UNIVERSITY', payload: id });
    } catch(error) {
        console.log(error);
    }
}
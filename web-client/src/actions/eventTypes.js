import * as api from '../api/index';

export const getAllEventTypesAction = () => async (dispatch) => {
    try {
        const { data } = await api.getAllEventTypes();
        dispatch({ type: 'GET_ALL_EVENT_TYPES', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const getEventTypeAction = (id) => async (dispatch) => {
    try {
        const { data } = await api.getEventTypeById(id);
        dispatch({ type: 'GET_EVENT_TYPE', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const addEventTypeAction = (formData) => async (dispatch) => {
    try {
        const { data } = await api.addEventType(formData);
        dispatch({ type: 'ADD_EVENT_TYPE', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const updateEventTypeAction = (id, formData) => async (dispatch) => {
    try {
        const { data } = await api.updateEventType(id, formData);
        dispatch({ type: 'UPDATE_EVENT_TYPE', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const deleteEventTypeAction = (id) => async (dispatch) => {
    try {
        await api.deleteEventType(id);
        dispatch({ type: 'DELETE_EVENT_TYPE', payload: id });
    } catch(error) {
        console.log(error);
    }
}
import * as api from '../api/index';

export const getAllEventsAction = () => async (dispatch) => {
    try {
        const { data } = await api.getAllEvents();
        dispatch({ type: 'GET_ALL_EVENTS', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const getEventAction = (id) => async (dispatch) => {
    try {
        const { data } = await api.getEventById(id);
        dispatch({ type: 'GET_EVENT', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const addEventAction = (formData) => async (dispatch) => {
    try {
        const { data } = await api.addEvent(formData);
        dispatch({ type: 'ADD_EVENT', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const updateEventAction = (id, formData) => async (dispatch) => {
    try {
        const { data } = await api.updateEvent(id, formData);
        dispatch({ type: 'UPDATE_EVENT', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const deleteEventAction = (id) => async (dispatch) => {
    try {
        await api.deleteEvent(id);
        dispatch({ type: 'DELETE_EVENT', payload: id });
    } catch(error) {
        console.log(error);
    }
}
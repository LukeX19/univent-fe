import * as api from '../api/index';

export const getAllEventParticipantCombinationsAction = () => async (dispatch) => {
    try {
        const { data } = await api.getAllEventParticipantCombinations();
        dispatch({ type: 'GET_ALL_EVENT_PARTICIPANT_COMBINATIONS', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const getEventParticipantsAction = (idEvent) => async (dispatch) => {
    try {
        const { data } = await api.getEventParticipantsByEventId(idEvent);
        dispatch({ type: 'GET_EVENT_PARTICIPANTS', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const getParticipantEvents = (idUser) => async (dispatch) => {
    try {
        const { data } = await api.getEventsByParticipantId(idUser);
        dispatch({ type: 'GET_PARTICIPANT_EVENTS', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const addEventAction = (formData) => async (dispatch) => {
    try {
        const { data } = await api.addEventParticipant(formData);
        dispatch({ type: 'ADD_EVENT_PARTICIPANT', payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const deleteEventAction = (idEvent) => async (dispatch) => {
    try {
        await api.deleteEventParticipant(idEvent);
        dispatch({ type: 'DELETE_EVENT_PARTICIPANT', payload: idEvent });
    } catch(error) {
        console.log(error);
    }
}
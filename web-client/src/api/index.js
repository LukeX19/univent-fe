import axios from "axios";

export const api = axios.create({ baseURL: "https://localhost:7260/" });

const token = localStorage.getItem("token");
export const apiWithToken = axios.create({
    baseURL: "https://localhost:7260/",
    timeout: 1000,
    headers: {"Authorization": "Bearer " + token}
});

//Identity
export const login = (formData) => api.post("api/v1/Identity/Login", formData);
export const register = (formData) => api.post("api/v1/Identity/Registration", formData);

//UserProfiles
export const getAllUserProfiles = () => apiWithToken.get("api/v1/UserProfiles");
export const getUserProfileById = (id) => apiWithToken.get(`api/v1/UserProfiles/${id}`);
export const updateUserProfile = (id, formData) => apiWithToken.patch(`api/v1/UserProfiles/${id}`, formData);
export const deleteUserProfile = (id) => apiWithToken.delete(`api/v1/UserProfiles/${id}`);

//Universities
export const getAllUniversities = () => api.get("api/v1/Universities");
export const getUniversityById = (id) => apiWithToken.get(`api/v1/Universities/${id}`);
export const addUniversity = (formData) => apiWithToken.post("api/v1/Universities", formData);
export const updateUniversity = (id, formData) => apiWithToken.patch(`api/v1/Universities/${id}`, formData);
export const deleteUniversity = (id) => apiWithToken.delete(`api/v1/Universities/${id}`);

//EventTypes
export const getAllEventTypes = () => apiWithToken.get("api/v1/EventTypes");
export const getEventTypeById = (id) => apiWithToken.get(`api/v1/EventTypes/${id}`);
export const addEventType = (formData) => apiWithToken.post("api/v1/EventTypes", formData);
export const updateEventType = (id, formData) => apiWithToken.patch(`api/v1/EventTypes/${id}`, formData);
export const deleteEventType = (id) => apiWithToken.delete(`api/v1/EventTypes/${id}`);

//Events
export const getAllEvents = () => apiWithToken.get("api/v1/Events");
export const getEventById = (id) => apiWithToken.get(`api/v1/Events/${id}`);
export const addEvent = (formData) => apiWithToken.post("api/v1/Events", formData);
export const updateEvent = (id, formData) => apiWithToken.patch(`api/v1/Events/${id}`, formData);
export const cancelEvent = (id, formData) => apiWithToken.patch(`api/v1/Events/${id}/CancelEvent`, formData);
export const deleteEvent = (id) => apiWithToken.delete(`api/v1/Events/${id}`);

//EventParticipants
export const getAllEventParticipantCombinations = () => apiWithToken.get("api/v1/EventParticipant");
// export const getEventParticipantByBothIds = (idEvent, idUser) => apiWithToken.get(`api/v1/EventParticipant/Event/${idEvent}/User/${idUser}`);
export const getEventParticipantsByEventId = (idEvent) => apiWithToken.get(`api/v1/EventParticipant/Event/${idEvent}/Participants`);
export const getEventsByParticipantId = (idUser) => apiWithToken.get(`api/v1/EventParticipant/User/${idUser}/EnrolledEvents`);
export const addEventParticipant = (formData) => apiWithToken.post("api/v1/EventParticipant", formData);
export const deleteEventParticipant = (idEvent) => apiWithToken.delete(`api/v1/EventParticipant/Event/${idEvent}/Participants`);

//Ratings
export const getAllRatings = () => apiWithToken.get("api/v1/Ratings");
export const getRatingById = (id) => apiWithToken.get(`api/v1/Ratings/${id}`);
export const addRating = (formData) => apiWithToken.post("api/v1/Ratings", formData);
export const deleteRating = (id) => apiWithToken.delete(`api/v1/Ratings/${id}`);
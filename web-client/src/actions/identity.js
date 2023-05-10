import * as api from '../api/index';

export const loginAction = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.login(formData);
        localStorage.setItem('token', data.token);
        dispatch({ type: 'AUTHENTICATION', payload: data.token });
        navigate("/feed");
    } catch(error) {
        console.log(error);
    }
}

export const registerAction = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.register(formData);
        localStorage.setItem('token', data.token);
        dispatch({ type: 'AUTHENTICATION', payload: data.token });
        navigate("/feed");
    } catch(error) {
        console.log(error);
    }
}
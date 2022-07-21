import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR,LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT} from './types';
import setAuthToken from '../utility/setAuthToken';

export const loadUser = () => async dispatch => {
        if(localStorage.token){
            setAuthToken(localStorage.token);
        }

       
}

// Register User
export const register = ({ name, email, password, company, designation, qualification, bio})=> async dispatch => {
        
        try {
                const res = await axios.post('/api/users/register',{name, email, password, company, designation, qualification, bio});
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                })
                dispatch(loadUser());
        } catch (error) {
            // const errors = await error.response.data.errors;

            // if(errors){
            //     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
            // }
            dispatch({
                type: REGISTER_FAIL,
                
            });
        }
}

//Login User
export const login = ({ email, password})=> async dispatch => {
        
    try {
            const res = await axios.post('/api/users/login',{ email, password});
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch(loadUser());
    } catch (error) {
        
        dispatch({
            type: LOGIN_FAIL,
            
        })
    }
}

export const logout = () => dispatch =>{
    dispatch({
        type: LOGOUT
    })
}
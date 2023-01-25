import * as api from '../api';
import {AUTH} from '../constants/actionType';

export const signup= (formData, history)=> async (dispath)=> {
    try {
        const {data}= await api.signup(formData);
        dispath({type: AUTH,  data})
        history.push("/");
    } catch (error) {
        console.log(error);
    }
}
export const signin= (formData, history)=> async (dispath)=> {
    try {
        const {data}= await api.signin(formData);
        dispath({type: AUTH, data})        
        history.push("/");
    } catch (error) {
        console.log(error);
    }
}
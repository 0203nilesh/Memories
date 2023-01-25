import {AUTH, LOGOUT}  from '../constants/actionType';

export default (state={authData: null}, action)=>{
        switch (action.type) {
            case AUTH:
                console.log(action?.data);
                localStorage.setItem("profile", JSON.stringify({...action?.data}));
                return {...state, authData: action?.data};
            case LOGOUT:
                localStorage.removeItem('profile');
                localStorage.clear();
                return {...state, authData: null};
            default:
                return state;
        }
}
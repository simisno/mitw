import  {createStore            ,
        applyMiddleware         ,}  from 'redux'
import  {composeWithDevTools    ,}  from 'redux-devtools-extension';
import  thunk                       from 'redux-thunk';

const   initState   = {
    username    : null                          ,
    token       : localStorage.getItem('token') ,
    tweets      : [],
    people      : [],
    isLoading   : false,
}
function getStore   (
    state   = initState ,
    action              ){
    switch (action.type) {
        case 'SEARCHED':
            return {
                ...state                        ,
                tweets      : action.payload    ,
                people      : action.payload    ,
                isLoading   : false             ,
            }
        case 'SEARCHING':
            return {
                ...state            ,
                isLoading  : true   ,
            }
        case 'SEARCHERROR':
            return {
                ...state            ,
                isLoading  : false  ,
            }
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state                                ,
                username : action.payload.user.username ,
                token    : action.payload.token         ,
            }
        case 'LOGIN_NOT_SUCCESS':
            return state
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state                                ,
                username : action.payload.user.username ,
                token    : action.payload.token         ,
            }
        case 'REGISTER_NOT_SUCCESS':
            return state
        case 'USER_LOADED':
            return {
                ...state                               ,
                username    : action.payload.user.username  ,
            }
        case 'USER_NOT_LOADED':
            return {
                ...state            ,
                username    : null  ,
                token       : null  ,
            }
        case 'LOGOUT':
            localStorage.setItem('token', null);
            return {
                ...state            ,
                username    : null  ,
                token       : null  ,
            }
        default:
            return state
    }
}

const middleware    = [thunk];

export default createStore(
    getStore                                            ,
    initState                                           ,
    composeWithDevTools(applyMiddleware(...middleware)) ,)

import { ACTION, declaredStateUser } from "../../model/UserModel" 


let initialState = {
    authUser: {},
    userUpdateStatus: false,
    userUpdated: {},
    message: null,
    authSuccess: false,
    authError: false,
    courier: {},
    registerAsCourierSuccess: false,
    registerAsCourierError: false,
}

export default (state: declaredStateUser = initialState, action: ACTION) => {
    switch(action.type) {
        case "LOG_IN":
            return {
                ...state,
                authUser: action.payload,
                authSuccess: true
            }
        case "REGISTER":
            return {
                ...state,
                authUser: action.payload,
                authSuccess: true
            }    
      
        case "get_authUser":
            return {
                ...state,
                authUser: action.payload,
                userSuccess: true
            }
        
        case "LOG_OUT":
            return {
                ...state,
                authUser: {},
                otherUser: {},
                userSuccess: true
            }
        case "AUTH_ERROR":
            return {
                ...state,
                message: action.payload,
                authError: true
            }
         case "REGISTER_AS_COURIER_SUCCESS":
            return {
                ...state,
                courier: action.payload,
                registerAsCourierSuccess: true
            };
        case "REGISTER_AS_COURIER_FAILURE":
            return {
                ...state,
                message: action.payload,
                registerAsCourierError: true
            };
        default:
            return state
    }
}
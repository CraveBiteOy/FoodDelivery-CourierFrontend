import { ACTION, declaredStateUser } from "../../model/UserModel" 


let initialState = {
    authUser: {},
    // userUpdateStatus: false,
    userUpdated: {},
    errorMessage: null,
    authSuccess: false,
    authError: false,
    courier: {},
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
        case "USER_ERROR":
            return {
                ...state,
                errorMessage: action.payload,
                authError: true
            }
        default:
            return state
    }
}
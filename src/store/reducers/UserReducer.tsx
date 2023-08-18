import { ACTION, declaredStateUser } from "../../model/UserModel" 


let initialState = {
    authUser: {},
    userUpdated: {},
    errorMessage: null,
    authSuccess: false,
    authError: false,
    courier: {},
    loading: false,
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
        case "LOADING_START":
            return {
                ...state,
                loading: true
            }
        case "LOADING_END":
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}
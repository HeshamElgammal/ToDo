import { AsyncStorage } from "react-native"
const INITIAL_STATE = {
    list: []
}


const storage = async (list) => {

    return (
        await AsyncStorage.setItem("storage_list", JSON.stringify(list))
    )
}


const AppReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "DELETE_ITEM":
            let new_array = state.list.filter((item, index) => index != action.payload_index)
            storage(new_array)
            return {
                ...state, list: new_array
            }
        case "ADD_ITEM":
            state.list.push(action.payload)
            storage(state.list)
            return {
                ...state, list: state.list
            }
        case "UPDATE_ITEM":
            state.list[action.payload_index].name = (action.payload_name)
            storage(state.list)

            return {
                ...state, list: state.list
            }
        case "STORAGE_DATA":
            return {
                ...state, list: action.payload
            }

        default:
            return state
    }
}

export default AppReducer
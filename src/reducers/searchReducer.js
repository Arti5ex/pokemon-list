export default function reducer (state = {
    searchText: ''
  }, action){

    switch (action.type){
      case "CHANGE_SELECT": {
        return{
          ...state,
          searchText: action.payload
        }
      }
    }

    return state
}

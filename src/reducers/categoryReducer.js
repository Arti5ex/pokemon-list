export default function reducer(state={
    categoryList: [],
    selectedCategory: '',
  }, action){

  switch (action.type){
    case "LIST_CATEGORY": {
      return {
        ...state,
        categoryList: action.payload
      }
    }
    case "SET_CATEGORY": {
        return {
          ...state,
          selectedCategory: action.payload
        }
    }
  }

    return state
}

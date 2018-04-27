import axios from 'axios'

export function changeSelect (text) {
  return {
    type: 'CHANGE_SELECT',
    payload: text
  }
}

export function search (text) {
  return function (dispatch) {
    if (text) {
      axios.get('/api/pokemon/' + text)
        .then(response => {
          const result = response.data ? JSON.parse(response.data).forms : []
          // console.log(result)
          dispatch({type: 'SET_POKEMONS', payload: result})
          // dispatch({type: 'CHANGE_SELECT', payload: ''});
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

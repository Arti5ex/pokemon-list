import axios from 'axios';

export function changeSelect (text) {
  return {
    type: 'CHANGE_SELECT',
    payload: text
  }
}

export function fetchCategory (text) {
  return function (dispatch) {
    axios.get('/api/type')
      .then((response) => {
        // console.log(response)
        dispatch({type: 'LIST_CATEGORY', payload: JSON.parse(response.data).results});
        // dispatch({type: 'CHANGE_SELECT', payload: ''});
      });
  }
}

export function selectCategory (name) {
  return function (dispatch) {
    axios.get('/api/type/' + name)
      .then((response) => {
        const data = JSON.parse(response.data)
        let pokemons = []

        if (data.pokemon.length > 0) {
          pokemons = data.pokemon.map((item) => {
            return item.pokemon
          })
        }
        dispatch({type: 'SET_CATEGORY', payload: name})
        // dispatch(setCount(data.pokemon.length))
        const pokemonsData = { 'results': pokemons, 'count': data.pokemon.length }
        dispatch({type: 'FETCH_POKEMONS', payload: pokemonsData})
        console.log(data.pokemon.length)

        pokemons.map(element => {
          dispatch(fetchPokemon(element.name))
        })

      })
  }
}

export function fetchPokemon (name) {
  return function (dispatch) {
    axios.get('/api/pokemon/' + name)
      .then(response => {
        dispatch({
          type: 'FETCH_POKEMON',
          payload: JSON.parse(response.data)
        })
      })
  }
}

export function setCount (countPokemons) {
  return {
    type: 'SET_POKEMONS_COUNT',
    payload: {
      count: countPokemons
    }
  }
}